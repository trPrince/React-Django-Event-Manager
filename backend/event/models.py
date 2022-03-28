from datetime import datetime
from django.db import models

class Event(models.Model):
   name = models.CharField(max_length=100)
   location = models.CharField(max_length=20)
   date = models.DateTimeField(default=datetime.utcnow)

   def _str_(self):
     return self.name