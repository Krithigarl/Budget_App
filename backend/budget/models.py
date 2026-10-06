from django.db import models


class Register(models.Model):
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username

    @property
    def is_authenticated(self):
        """Required for DRF compatibility"""
        return True

    @property
    def is_active(self):
        """Required for DRF compatibility"""
        return True


class BudgetEntry(models.Model):
    user = models.ForeignKey(Register, on_delete=models.CASCADE, related_name="budget_entries")
    month = models.CharField(max_length=20)
    income = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    expense = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    savings = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    wallet_balance = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    description = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def save(self, *args, **kwargs):
        self.savings = self.income - self.expense

        if self.pk:
            previous_entry = (
                BudgetEntry.objects.filter(user=self.user)
                .exclude(pk=self.pk)
                .order_by("-created_at")
                .first()
            )
        else:
            previous_entry = (
                BudgetEntry.objects.filter(user=self.user).order_by("-created_at").first()
            )

        if previous_entry is None:
            self.wallet_balance = self.savings
        else:
            self.wallet_balance = previous_entry.wallet_balance + self.savings

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.month} - {self.user.username}"