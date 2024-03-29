from rest_framework import viewsets, permissions
from .serializers import TodoSerializer



class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = TodoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return self.request.user.todos.all()

    def perform_create(self,serializer):
        serializer.save(owner=self.request.user)
     
