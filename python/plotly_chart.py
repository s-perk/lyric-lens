import pandas as pd
import plotly.express as px
import plotly.offline
from plotly import __version__
# from plotly.offline import download_plotlyjs, init_notebook_mode, plot, iplot
# import plotly.graph_objects as go
# import cufflinks as cf


def file_to_array(file_name):
  # Open file and read each line
  f = open(file_name, "r")

  song_string = ''
  for line in f:
      #print(line)
      song_string = song_string + line

  f.close()

  song_ary = lyrics_to_array(song_string)

  return song_ary


# I: Raw string of all lyrics, newlines, etc.
# O: 1-dimensional array of strings (each string a lyric)
def lyrics_to_array(song_string):
  # String of all special characters that could be in song
  # most of this is produced from string.punctuation
  special_characters = '!#"$%&()*+,-./:;<=>?@[\]^_`{|}~'


  #Use translate to remove special characters (fastest way to do this according to https://stackoverflow.com/questions/265960/best-way-to-strip-punctuation-from-a-string)
  trans_table = song_string.maketrans(special_characters,len(special_characters) * ' ')
  song_string = song_string.translate(trans_table)

  # Replace a few more characters
  song_string = song_string.replace('\n',' ')

  # Convert all to lowercase
  song_string = song_string.lower()

  # Split into array
  song_ary = song_string.split(' ')
  # Remove all empty strings by checking if the string is not empty, then re-make the list with all strings that are not empty.
  song_ary = [i for i in song_ary if i]

  return song_ary

def create_graph_dataframe(array, exclude_words):
  x_ary = []
  y_ary = []
  word_ary = []
  word_count = {}

  for index1,word1 in enumerate(array):
    for index2,word2 in enumerate(array):
        #if index1 == index2: continue

        #Don't include common words
        if word1 in exclude_words: continue

        if word1 == word2:
            # print(str(index1) + ':' + str(index2))
            x_ary.append(index1)
            y_ary.append(index2)
            word_ary.append(word1)

            try:
                word_count[word1] += 1
            except:
                word_count[word1] = 1

  df = pd.DataFrame({'x': x_ary, 'y': y_ary, 'word':word_ary})

  return df, word_count


def create_word_count_dataframe(word_count):

  column_word = []
  column_count = []

  for word in word_count:
    column_word.append(word)
    column_count.append(word_count[word])

  df_word_count = pd.DataFrame({'word':column_word,'count':column_count})

  df_word_count = df_word_count.sort_values(by='count',ascending=0)

  df_word_count['count'] = df_word_count['count'].apply(lambda x: x**(1/2))

  return df_word_count

def create_scatter_plot(df):

  # https://plotly.com/python-api-reference/generated/plotly.express.scatter
  fig = px.scatter(
      df,
      x='x',
      y='y',
      size='count',
      color='count',
      color_continuous_scale='ylorrd', #these are the colors of the dot. All available colors: https://plotly.com/python/builtin-colorscales/
      hover_name='word',
      size_max=8, #max size of the dots
      width=800,
      height=800,
      range_color = [0, 8], #Adjust the end of the range for brighter colors
      render_mode='svg'
      )

  fig.update_yaxes(scaleanchor = "x", scaleratio = 1, showgrid=False,title='',visible=False)
  fig.update_xaxes(showgrid=False,title='',visible=False)
  fig.update_layout(template='plotly_dark') #template options: "plotly", "plotly_white", "plotly_dark", "ggplot2", "seaborn", "simple_white", "none"

  return fig




def main(lyrics):
  print('do stuff here!')

  # **** OLD PARSE SONG LYRICS *****
  # song_name = "Here Is Where"
  # song_name = "Can't Get You Outta My Head"
  # song_name = "All Too Well (10 min)"
  # file_name = song_name + '.txt'
  # song_ary = file_to_array(file_name)


  exclude_words = ['the','a','to','and','it','i','was','you']

  song_ary = lyrics_to_array(lyrics)

  print('=========NEW ARRAY', song_ary)

  df, word_count = create_graph_dataframe(song_ary, exclude_words)

  df_word_count = create_word_count_dataframe(word_count)

  # Merge counts onto graph dataframe
  df = df.merge(df_word_count, how='left', on='word')

  fig = create_scatter_plot(df)

  # fig.show()
  # fig.write_image(song_name +'.jpg')
  plotly.offline.plot(fig, filename='file.html')
  # div = plotly.offline.plot(fig, include_plotlyjs=False, output_type='div')
  div = plotly.io.to_html(fig, include_plotlyjs=False, full_html=False)
  return div

