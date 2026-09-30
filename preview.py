"""Local/LAN preview only. Serves explicitly public assets, never the project tree."""
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import argparse

ROOT = Path(__file__).resolve().parent
PUBLIC = {
    '/': ('index.html', 'text/html; charset=utf-8'),
    '/index.html': ('index.html', 'text/html; charset=utf-8'),
    '/styles.css': ('styles.css', 'text/css; charset=utf-8'),
    '/script.js': ('script.js', 'text/javascript; charset=utf-8'),
    '/favicon.svg': ('favicon.svg', 'image/svg+xml'),
    '/assets/studio-sculpture.png': ('assets/studio-sculpture.png', 'image/png'),
    '/assets/arrow-ne.svg': ('assets/arrow-ne.svg', 'image/svg+xml'),
}

class Handler(BaseHTTPRequestHandler):
    server_version = 'Preview'
    sys_version = ''

    def serve(self, head=False):
        asset = PUBLIC.get(urlsplit(self.path).path)
        if asset is None:
            self.send_error(404)
            return
        file = ROOT / asset[0]
        if file.is_symlink() or not file.resolve().is_relative_to(ROOT) or not file.is_file():
            self.send_error(404)
            return
        data = file.read_bytes()
        self.send_response(200)
        self.send_header('Content-Type', asset[1])
        self.send_header('Content-Length', str(len(data)))
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('Referrer-Policy', 'no-referrer')
        self.send_header('Content-Security-Policy', "frame-ancestors 'none'")
        self.send_header('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
        self.send_header('Cache-Control', 'no-store')
        self.end_headers()
        if not head:
            self.wfile.write(data)

    def do_GET(self):
        self.serve()

    def do_HEAD(self):
        self.serve(head=True)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--bind', default='127.0.0.1')
    parser.add_argument('--port', type=int, default=8000)
    args = parser.parse_args()
    ThreadingHTTPServer((args.bind, args.port), Handler).serve_forever()
