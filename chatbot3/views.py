from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    return render(request, 'chatbot3/index.html')


import json
from django.views.generic.base import TemplateView
from django.views.generic import View
from django.http import JsonResponse

from chatterbot import ChatBot
from chatterbot.comparisons import LevenshteinDistance
from chatterbot.response_selection import get_first_response
from chatterbot.response_selection import get_most_frequent_response
from chatterbot.trainers import ListTrainer

from chatterbot.trainers import ChatterBotCorpusTrainer

chatbot123 = ChatBot('bot123',read_only=True,#登録データを利用しない
                     logic_adapters=[
                         {
                          'import_path': 'chatterbot.logic.BestMatch',
                          'statement_comparison_function': LevenshteinDistance,
                          'response_selection_method': get_first_response
                          #"response_selection_method": get_most_frequent_response,
                          #'default_response': 'すいません。わかりません。'
                          #'maximum_similarity_threshold': 0.50
                          }
                     ]
            )

trainer = ChatterBotCorpusTrainer(chatbot123)
trainer.train('chatterbot.corpus.japanese')


trainer = ListTrainer(chatbot123)

trainer.train([
    "こんにちは",
    "はじめまして！！",
])

trainer.train([
    "調子は？",
    "元気元気！",
    "それはよかった",
])



class ChatterBotAppView(TemplateView):
    template_name = 'app.html'


class ChatterBotApiView(View):

    """
    Provide an API endpoint to interact with ChatterBot.
    """

    def post(self, request, *args, **kwargs):
        """
        Return a response to the statement in the posted data.

        * The JSON data should contain a 'text' attribute.
        """

        input_data = json.loads(request.body.decode('utf-8'))
        print (input_data)

        if input_data['text'] == "動物":
            response = {
                'output': [
                    {
                    'type': 'text',
                    'value': '好きな動物は？',
                    'delayMs': 200  #表示ディレイ（ミリ秒）
                    },
                    {
                    'type': 'option',
                    'options': [
                        {'label': 'イヌ', 'value': '犬'},
                        {'label': 'ネコ', 'value': '猫'},
                        {'label': 'タヌキ', 'value': '狸'}
                    ]}
                ]
            }
        elif input_data['text'] == "犬":
           response = {
               'output': [
                    {
                    'type': 'image',
                    'value': 'http://hoppara.github.io/image/inu.jpg'
                    }
                ]
            }
        elif input_data['text'] == "猫":
           response = {
               'output': [
                    {
                    'type': 'image',
                    'value': 'http://hoppara.github.io/image/neko.jpg'
                    }
                ]
            }
        elif input_data['text'] == "狸":
           response = {
               'output': [
                    {
                    'type': 'image',
                    'value': 'http://hoppara.github.io/image/tanuki.jpg'
                    }
                ]
            }

        else:
            response = {
                'output': [
                    {
                    'type' : 'text',
                    # 'value' : '「' + input_data['text'] + '」ですね！'
                    'value' : chatbot123.get_response(input_data['text']).text
                    }
                ]
            }

        return JsonResponse(response, status=200)

    def get(self, request, *args, **kwargs):
        """
        Return data corresponding to the current conversation.
        """

        text = request.GET['text']
        print(text)
        callback = request.GET['callback']
        print(callback)


        response = {
            'output': [
                {
                'type' : 'text',
                'value' : '「' + text + '」ですね！'
                }
            ]
        }

        responseText = callback + '(' + json.dumps(response) + ')'
        print(responseText)
        return HttpResponse( responseText , content_type = "application/javascript")



