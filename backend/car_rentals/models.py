from django.db import models
import json
import requests
from bs4 import BeautifulSoup


class PriceTracker(models.Model):
    email = models.CharField(max_length=200)

    @staticmethod
    def getPriceGrid(airport):
        s = requests.Session()

        r = s.get('https://www.costcotravel.com/')

        csrf_token = r.headers['Csrf-token']

        formdata = {
            'rcs': 1,
            'driverAge': 25,
            'pickupCity': airport,
            'dropoffCity': airport,
            'pickupAsAirport': True,
            'dropoffAsAirport': True,
            'pickupDate': '09/30/2021',
            'dropoffDate': '10/01/2021',
            'pickupTime': '12:00 PM',
            'dropoffTime': '12:00 PM',
            'pickupLocationCode': airport,
            'dropoffLocationCode': airport,
            'fromHomePage': True,
            '_uid': '1630327736438_595.2138142095787'
        }

        headers = {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'X-Csrf-Token': csrf_token
        }
        r = s.post('https://www.costcotravel.com/rentalCarSearch.act', formdata, headers=headers)

        r = s.get('https://www.costcotravel.com/h=3002')

        soup = BeautifulSoup(r.text, 'html.parser')

        grid = soup.find('div', class_='desktop-grid')

        results = {}
        for elem in grid.find_all('a', class_='car-result-card'):
            brand, category, price = elem['data-brand'], elem['data-category-name'], elem['data-price']
            price = round(float(price), 2)
            if category not in results:
                results[category] = dict(options=[], lowestPrice=100000.00)
            results[category]['lowestPrice'] = min(results[category]['lowestPrice'], price)
            results[category]['options'].append(dict(brand=brand, price=price))

        return results



class CarCategories(models.Model):
    price_tracker = models.ForeignKey(PriceTracker, on_delete=models.CASCADE)
    car_category = models.CharField(max_length=200)

    class Meta:
        unique_together = ('price_tracker', 'car_category')

