# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0008_auto_20191115_1625'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='last_login',
            field=models.DateTimeField(verbose_name='last login', blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='vacation',
            name='motive',
            field=models.CharField(max_length=30, blank=True),
        ),
    ]
