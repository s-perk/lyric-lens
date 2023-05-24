from dash import Dash, dcc, html, Input, Output
import plotly.express as px
import pandas as pd
import time
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import plotly_chart


colorscales = px.colors.named_colorscales()

pickle_filepath = '/Users/StephenPerkins/Documents/Coding/Hack Reactor/MVP/Lyric Lens/python/plotly_data.pkl'

plotly_data = pd.read_pickle(pickle_filepath)
scale = 'viridis'


app = Dash(__name__)

colors = {
    'background': '#111111',
    'text': '#7FDBFF'
}

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
        color_continuous_scale=scale, #these are the colors of the dot. All available colors: https://plotly.com/python/builtin-colorscales/
        hover_name='word',
        size_max=15, #max size of the dots
        width=1000,
        height=1000,
        range_color = [0, 42], #Adjust the end of the range for brighter colors
        render_mode='svg'
    )

    fig.update_yaxes(scaleanchor = "x", scaleratio = 1, showgrid=False,title='',visible=False)
    fig.update_xaxes(showgrid=False,title='',visible=False)
    fig.update_layout(template='plotly_dark') #template options: "plotly", "plotly_white", "plotly_dark", "ggplot2", "seaborn", "simple_white", "none"

    # df = px.data.iris() # replace with your own data source
    # fig = px.scatter(
    #     df,
    #     # x="sepal_width",
    #     # y="sepal_length",
    #     # color="sepal_length",
    #     # color_continuous_scale=scale,
    # )
    return fig


def setup_app():


    app.layout = html.Div(style={'backgroundColor': colors['background']}, children=[
        # html.H4('Interactive Plotly Express color scale selection'),
        # html.P("Color Scale"),
        html.Div(id='time-stamp', children=[time.time()], style={'backgroundColor': colors['background'], 'color': 'aquamarine'}),
        html.Div(id='your-component-id', style={'backgroundColor': colors['background'], 'color': 'aquamarine'}),

        dcc.Dropdown(
            id='builtin-colorscales-x-dropdown',
            options=colorscales,
            value='viridis'
        ),

        html.Center(
            dcc.Graph(id="builtin-colorscales-x-graph")
        )

    ])

    # Callback to update data set
    @app.callback(
        Output('your-component-id', 'children'),
        # Output("builtin-colorscales-x-graph", "figure"),
        Input('time-stamp', 'children')
    )
    def update_file(change):
        update_data()
        print('updating dataframe at ' + time.strftime("%H:%M:%S"))
        # Your logic to update the visualization components with the new data
        return html.Div("Data refreshed at: " + time.strftime("%H:%M:%S"))



    # Callback to automatically refresh graph based on colorscales
    @app.callback(
        Output("builtin-colorscales-x-graph", "figure"),
        Input("builtin-colorscales-x-dropdown", "value")
    )
    def change_colorscale(sc):
        global scale
        scale = sc
        return refresh_data()


    if __name__ == "__main__":
        app.run_server(debug=True)



# Set up event handler to update graph every time .pkl file updates
class FileChangeHandler(FileSystemEventHandler):
    def on_modified(self, event):
        print('pickle file changed!')
        print('event.is_directory', event.is_directory)
        print('event.src_path', event.src_path)
        if not event.is_directory and event.src_path.endswith('.pkl'):
            print('run event handler!')
            update_data()

# Function to update data
def update_data():
    global plotly_data
    plotly_data = pd.read_pickle(pickle_filepath)


# Set up event handlers
observer = Observer()
observer.schedule(FileChangeHandler(), path='/Users/StephenPerkins/Documents/Coding/Hack Reactor/MVP/Lyric Lens/python/', recursive=False)
observer.start()


setup_app()

