from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('budget', '0003_delete_user'),
    ]

    operations = [
        migrations.CreateModel(
            name='BudgetEntry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('month', models.CharField(max_length=20)),
                ('income', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('expense', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('savings', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('wallet_balance', models.DecimalField(decimal_places=2, default=0, max_digits=12)),
                ('description', models.CharField(blank=True, max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='budget_entries', to='budget.register')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]
