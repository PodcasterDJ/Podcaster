from django import forms

from .models import Join

class JoinForm(forms.ModelForm):
    email = forms.EmailField(widget=forms.TextInput(
        attrs={
            "id":"id_email_field",
            "name": "email_field",
            "class": "form-control",
            "type": "email",
            "placeholder": "Your E-mail",
            "required": True
        }
    ), required=True)
    
    class Meta:
        model = Join
        fields = ['email']


