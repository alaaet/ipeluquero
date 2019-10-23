from django.db import models
from account.models import Account

# Create your models here.
class Todo(models.Model):
    task= models.CharField(max_length=255)
    owner = models.ForeignKey(
        Account,
        related_name="todos",
        on_delete=models.CASCADE,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.task
