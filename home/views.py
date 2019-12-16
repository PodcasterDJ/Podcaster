from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.utils.translation import activate
# Create your views here.


def redirectHome(request):
    return HttpResponseRedirect('/home')


def home(request):
    activate('en')
    # response = self.client.get(reverse("home"))
    # self.assertTemplateUsed(response, "taskbuster/index.html")
    return render(request, 'base.html')
