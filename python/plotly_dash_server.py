import time

import pandas as pd
import plotly.express as px
import plotly_chart
from dash import Dash, Input, Output, ctx, dcc, html
from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer

colorscales = px.colors.named_colorscales()

pickle_filepath = '/Users/StephenPerkins/Documents/Coding/Hack Reactor/MVP/Lyric Lens/python/plotly_data.pkl'

plotly_data = pd.read_pickle(pickle_filepath)
scale = 'viridis'


app = Dash(__name__)

colors = {'background': '#111111', 'text': '#7FDBFF'}


# Function to update data
def update_data():
    global plotly_data
    plotly_data = pd.read_pickle(pickle_filepath)


def refresh_data():
    df = pd.read_pickle(pickle_filepath)
    # df = px.data.iris() # replace with your own data source
    # Need to figure out how to get the dataframe into this file at runtime
    # A snapshot of this plot is served when it's started, so need to find a way to treat our dataframe as state, and not constant as being used here...

    # Check this out:
    # https://dash.plotly.com/sharing-data-between-callbacks
    fig = px.scatter(
        df,
        x='x',
        y='y',
        size='count',
        color='count',
        color_continuous_scale=scale,  # these are the colors of the dot. All available colors: https://plotly.com/python/builtin-colorscales/
        hover_name='word',
        size_max=15,  # max size of the dots
        width=1000,
        height=1000,
        range_color=[0, 42],  # Adjust the end of the range for brighter colors
        render_mode='svg',
    )

    fig.update_yaxes(
        scaleanchor="x", scaleratio=1, showgrid=False, title='', visible=False
    )
    fig.update_xaxes(showgrid=False, title='', visible=False)
    fig.update_layout(
        template='plotly_dark'
    )  # template options: "plotly", "plotly_white", "plotly_dark", "ggplot2", "seaborn", "simple_white", "none"

    return fig


def setup_app():
    app.layout = html.Div(
        style={'backgroundColor': colors['background']},
        children=[
            html.Div(
                id='time-stamp-formatted',
                style={'backgroundColor': colors['background'], 'color': 'aquamarine'},
            ),
            dcc.Dropdown(
                id='colorscales-dropdown',
                options=colorscales,
                value='viridis',
            ),
            dcc.Interval(
                id='interval-component',
                interval=10 * 1000,  # in milliseconds
                n_intervals=0,
            ),
            html.Center(dcc.Graph(id="pretty-graph")),
        ],
    )

    # Callback to automatically refresh graph based on colorscales and time stamp
    @app.callback(
        Output("pretty-graph", "figure"),
        Output("time-stamp-formatted", "children"),
        Input("colorscales-dropdown", "value"),
        Input("interval-component", "n_intervals"),
    )
    def update_graph(sc, interval):
        triggered_id = ctx.triggered_id
        timestamp = html.Div("Data refreshed at: " + time.strftime("%H:%M:%S %p"))

        if triggered_id == 'colorscales-dropdown':
            global scale
            scale = sc
            return refresh_data(), timestamp

        else:
            return refresh_data(), timestamp

    if __name__ == "__main__":
        app.run_server(debug=True)


# Set up event handler to update graph every time .pkl file updates
class FileChangeHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if not event.is_directory and event.src_path.endswith('.pkl'):
            print('pickle file changed!')
            print('run event handler!')
            update_data()


# Set up event handlers
observer = Observer()
observer.schedule(
    FileChangeHandler(),
    path='/Users/StephenPerkins/Documents/Coding/Hack Reactor/MVP/Lyric Lens/python/',
    recursive=False,
)
observer.start()


setup_app()
