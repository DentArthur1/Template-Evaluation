from django.shortcuts import render
from django.core.paginator import Paginator
from .models import Group

def groups_view(request):
    groups = Group.objects.all().order_by('id')  # Ordina i gruppi per ID in ordine crescente
    paginator = Paginator(groups, 2)  # Mostra 2 gruppi per pagina
    page_number = request.GET.get('page')  # Ottieni il numero di pagina dalla query string
    page_obj = paginator.get_page(page_number)  # Ottieni l'oggetto della pagina corrente
    return render(request, 'index.html', {'page_obj': page_obj})  # Passa 'page_obj' al template
