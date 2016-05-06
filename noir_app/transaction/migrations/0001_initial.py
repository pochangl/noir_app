# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='PayCheck',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('modify_time', models.DateTimeField(auto_now=True)),
                ('create_time', models.DateTimeField(auto_now_add=True)),
                ('amount', models.CharField(max_length=128)),
                ('reason_code', models.CharField(max_length=128)),
                ('reason', models.CharField(max_length=128)),
                ('employee', models.ForeignKey(related_name='paycheck_employee_id', to='account.Employee')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
