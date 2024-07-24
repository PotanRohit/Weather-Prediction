import requests
from django.http import JsonResponse
from rest_framework.decorators import api_view
from .models import City, WeatherData
from decouple import config

@api_view(['GET'])
def get_weather(request, city_name):
    api_key = config('OPENWEATHER_API_KEY')
    weather_url = f'http://api.openweathermap.org/data/2.5/weather?q={city_name}&appid={api_key}&units=metric'

    response = requests.get(weather_url)
    print("API Response:", response.json())  # Print the API response

    if response.status_code == 200:
        data = response.json()
        temperature = data['main']['temp']
        description = data['weather'][0]['description']

        # Save the city if it doesn't exist
        city, created = City.objects.get_or_create(name=city_name)

        # Create WeatherData instance
        weather_data = WeatherData(
            city=city,
            temperature=temperature,
            description=description
        )
        weather_data.save()

        result = {
            'city': city_name,
            'temperature': temperature,
            'description': description
        }
        return JsonResponse(result)
    else:
        error_message = response.json().get('message', 'City not found')
        return JsonResponse({'error': error_message}, status=response.status_code)
