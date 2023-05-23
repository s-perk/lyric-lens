from dash import Dash, dcc, html, Input, Output
import plotly.express as px
import pandas as pd
import plotly_chart


colorscales = px.colors.named_colorscales()

plotly_data = pd.read_pickle('/Users/StephenPerkins/Documents/Coding/Hack Reactor/MVP/Lyric Lens/python/plotly_data.pkl')


app = Dash(__name__)

colors = {
    'background': '#111111',
    'text': '#7FDBFF'
}

app.layout = html.Div(style={'backgroundColor': colors['background']}, children=[
    # html.H4('Interactive Plotly Express color scale selection'),
    # html.P("Color Scale"),

    dcc.Dropdown(
        id='builtin-colorscales-x-dropdown',
        options=colorscales,
        value='viridis'
    ),

    html.Center(
        dcc.Graph(id="builtin-colorscales-x-graph")
    )

])


@app.callback(
    Output("builtin-colorscales-x-graph", "figure"),
    Input("builtin-colorscales-x-dropdown", "value")
    )

def change_colorscale(scale):

    df = plotly_data
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


if __name__ == "__main__":
    app.run_server(debug=True)
