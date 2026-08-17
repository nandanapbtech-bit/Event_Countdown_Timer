from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated ,AllowAny
from rest_framework import generics
from .models import Event
from .Serializers import EventSerializer,RegisterSerializer


class HomeView(APIView):

    permission_classes = []

    def get(self, request):

        return Response({
            "message": "Event Countdown Timer API is running!",
            "status": "success"
        })
class  RegisterView(generics.CreateAPIView):

    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class EventListCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        events = Event.objects.filter(
            owner=request.user
        )

        serializer = EventSerializer(
            events,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):

        serializer = EventSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save(
                owner=request.user
            )

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class EventDetailView(APIView):

    permission_classes = [IsAuthenticated]

    def get_object(self, pk, user):

        try:
            return Event.objects.get(
                pk=pk,
                owner=user
            )

        except Event.DoesNotExist:
            return None

    def get(self, request, pk):

        event = self.get_object(
            pk,
            request.user
        )

        if event is None:
            return Response(
                {"detail": "Event not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = EventSerializer(event)

        return Response(serializer.data)

    def delete(self, request, pk):

        event = self.get_object(
            pk,
            request.user
        )

        if event is None:
            return Response(
                {"detail": "Event not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        event.delete()

        return Response(
            {"message": "Event deleted successfully."},
            status=status.HTTP_204_NO_CONTENT
        )