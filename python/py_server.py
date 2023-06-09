from wsgiref.simple_server import make_server
import plotly_chart

def web_app(environment, response):
    status = '200 ok steve'
    headers = [('Content-type', 'text/html; charset=utf-8')]
    response(status, headers)

    # the environment variable CONTENT_LENGTH may be empty or missing
    try:
        request_body_size = int(environment.get('CONTENT_LENGTH', 0))
    except (ValueError):
        request_body_size = 0

    request_body = environment['wsgi.input'].read(request_body_size)
    # d = parse_qs(request_body)
    # print(request_body)
    lyrics = request_body.decode('utf-8')
    print('decoded', lyrics)



    div = plotly_chart.main(lyrics)
    # df = plotly_chart.main()
    # return [b'<strong>Hello World I just created my first WSGI</strong>']
    return [f'{div}'.encode('utf-8')]

with make_server('', 8000, web_app) as server:
    print('Serving on port 8000...\nVisit http://127.0.0.1:8000\nTo kill the server enter Ctrl+C')

    server.serve_forever()