from rest_framework import serializers

from .models import BudgetEntry, Register


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Register
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        from django.contrib.auth.hashers import make_password

        validated_data['password'] = make_password(validated_data['password'])
        return Register.objects.create(**validated_data)


class BudgetEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetEntry
        fields = ['id', 'month', 'income', 'expense', 'savings', 'wallet_balance', 'description', 'created_at', 'updated_at']
        read_only_fields = ['id', 'savings', 'wallet_balance', 'created_at', 'updated_at']

    def create(self, validated_data):
        user = self.context['request'].user
        return BudgetEntry.objects.create(user=user, **validated_data)
