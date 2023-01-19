from django.test import TestCase, Client
from pets_app.models import User, Adoptante, Voluntario, Animal, Adopcion, UserManager, AdoptanteManager, VoluntarioManager


class TestViews(TestCase):

    def setUp(self):

        self.client = Client()

        self.admin = User.objects.create_superuser(email='admin@example.com',
                                                   first_name='Admin',
                                                   last_name='Admin',
                                                   password='admin123',
                                                   role='ADMIN',
                                                   username='admin')

        self.voluntario = Voluntario.objects.create_user(email='voluntario@example.com',
                                                         first_name='Voluntario',
                                                         last_name='Voluntario',
                                                         password='voluntario123',
                                                         role='VOLUNTARIO')

        self.adoptante = Adoptante.objects.create_user(email='adoptante@example.com',
                                                       first_name='Adoptante',
                                                       last_name='Adoptante',
                                                       password='adoptante123',
                                                       role='ADOPTANTE')

        self.animal = Animal.objects.create(nombre='Animal',
                                            tipo='PERRO',
                                            raza='Raza',
                                            edad=1,
                                            estado='EN_ADOPCION')

        self.adopcion = Adopcion.objects.create(animal=self.animal,
                                                adoptante=self.adoptante,
                                                voluntario=self.voluntario)

    def test_jwt_token(self):
        """Test case for token authentication"""

        response = self.client.post(
            '/api/token/', {'email': 'voluntario@example.com', 'password': 'voluntario123'}, format='json')

        refresh = response.data['refresh']
        access = response.data['access']
        status_code = response.status_code

        self.assertIsNotNone(refresh)
        self.assertIsNotNone(access)
        self.assertEqual(status_code, 200)

    def test_jwt_refresh_token(self):
        """Test case for token refresh"""

        jwt_response = self.client.post(
            '/api/token/', {'email': 'voluntario@example.com', 'password': 'voluntario123'}, format='json')
        jwt_refresh = jwt_response.data['refresh']

        response = self.client.post('/api/token/refresh/', {'refresh': jwt_refresh},
                                    format='json', HTTP_AUTHORIZATION='Bearer ' + jwt_response.data['access'])

        refresh = response.data['refresh']
        access = response.data['access']
        status_code = response.status_code

        self.assertIsNotNone(refresh)
        self.assertIsNotNone(access)
        self.assertEqual(status_code, 200)

    def test_voluntario_list(self):
        """Test case for voluntario list"""

        jwt_response = self.client.post(
            '/api/token/', {'email': 'voluntario@example.com', 'password': 'voluntario123'}, format='json')

        jwt_access = jwt_response.data['access']

        response = self.client.get(
            '/api/voluntarios/', HTTP_AUTHORIZATION='Bearer ' + jwt_access)

        status_code = response.status_code
        api_response = response.data

        self.assertEqual(status_code, 200)
        self.assertEqual(len(api_response), 1)
        self.assertEqual(api_response[0]['email'], 'voluntario@example.com')

    def test_adoptante_list(self):
        """Test case for adoptante list"""

        jwt_response = self.client.post(
            '/api/token/', {'email': 'voluntario@example.com', 'password': 'voluntario123'}, format='json')
        jwt_access = jwt_response.data['access']

        response = self.client.get(
            '/api/adoptantes/', HTTP_AUTHORIZATION='Bearer ' + jwt_access)

        status_code = response.status_code
        api_response = response.data

        self.assertEqual(status_code, 200)
        self.assertEqual(len(api_response), 1)
        self.assertEqual(api_response[0]['email'], 'adoptante@example.com')

    def test_animal_list(self):
        """Test case for animal list"""

        jwt_response = self.client.post(
            '/api/token/', {'email': 'voluntario@example.com', 'password': 'voluntario123'}, format='json')
        jwt_access = jwt_response.data['access']

        response = self.client.get(
            '/api/animales/', HTTP_AUTHORIZATION='Bearer ' + jwt_access)

        status_code = response.status_code
        api_response = response.data

        self.assertEqual(status_code, 200)
        self.assertEqual(len(api_response), 1)
        self.assertEqual(api_response[0]['nombre'], 'Animal')

    def test_adopcion_list(self):
        """Test case for adopcion list"""

        jwt_response = self.client.post(
            '/api/token/', {'email': 'voluntario@example.com', 'password': 'voluntario123'}, format='json')
        jwt_access = jwt_response.data['access']

        response = self.client.get(
            '/api/adopciones/', HTTP_AUTHORIZATION='Bearer ' + jwt_access)

        status_code = response.status_code
        api_response = response.data

        self.assertEqual(status_code, 200)
        self.assertEqual(len(api_response), 1)

        self.assertEqual(api_response[0]['animal']['id'], self.animal.id)
        self.assertEqual(api_response[0]['adoptante']['id'], self.adoptante.id)
        self.assertEqual(api_response[0]['voluntario']
                         ['id'], self.voluntario.id)

    def test_voluntario_detail(self):
        """Test case for voluntario detail"""

        jwt_response = self.client.post(
            '/api/token/', {'email': 'admin@example.com', 'password': 'admin123'}, format='json')

        jwt_access = jwt_response.data['access']

        response = self.client.get(
            '/api/voluntarios/' + str(self.voluntario.id) + '/', HTTP_AUTHORIZATION='Bearer ' + jwt_access)

        status_code = response.status_code
        api_response = response.data

        self.assertEqual(status_code, 200)
        self.assertEqual(api_response['email'], 'voluntario@example.com')

    def test_adoptante_detail(self):
        """Test case for adoptante detail"""

        jwt_response = self.client.post(
            '/api/token/', {'email': 'admin@example.com', 'password': 'admin123'}, format='json')
        jwt_access = jwt_response.data['access']

        response = self.client.get(
            '/api/adoptantes/' + str(self.adoptante.id) + '/', HTTP_AUTHORIZATION='Bearer ' + jwt_access)

        status_code = response.status_code
        api_response = response.data

        self.assertEqual(status_code, 200)
        self.assertEqual(api_response['email'], 'adoptante@example.com')

    def test_animal_detail(self):
        """Test case for animal detail"""

        jwt_response = self.client.post(
            '/api/token/', {'email': 'admin@example.com', 'password': 'admin123'}, format='json')
        jwt_access = jwt_response.data['access']

        response = self.client.get(
            '/api/animales/' + str(self.animal.id) + '/', HTTP_AUTHORIZATION='Bearer ' + jwt_access)

        status_code = response.status_code
        api_response = response.data

        self.assertEqual(status_code, 200)
        self.assertEqual(api_response['nombre'], 'Animal')

    def test_adopcion_detail(self):
        """Test case for adopcion detail"""

        jwt_response = self.client.post(
            '/api/token/', {'email': 'admin@example.com', 'password': 'admin123'}, format='json')
        jwt_access = jwt_response.data['access']

        response = self.client.get(
            '/api/adopciones/' + str(self.adopcion.id) + '/', HTTP_AUTHORIZATION='Bearer ' + jwt_access)

        status_code = response.status_code
        api_response = response.data

        self.assertEqual(status_code, 200)
        self.assertEqual(api_response['animal']['id'], self.animal.id)
        self.assertEqual(api_response['adoptante']['id'], self.adoptante.id)
        self.assertEqual(api_response['voluntario']['id'], self.voluntario.id)

    def test_voluntario_create(self):
        """Test case for voluntario create"""

        jwt_response = self.client.post(
            '/api/token/', {'email': 'admin@example.com', 'password': 'admin123'}, format='json')
        jwt_access = jwt_response.data['access']

        data = {
            'email': 'voluntario_2@example',
            'password': 'voluntario123',
            'first_name': 'Voluntario',
            'last_name': '2',
            'role': 'VOLUNTARIO'
        }

        response = self.client.post(
            '/api/voluntarios/', data, format='json', HTTP_AUTHORIZATION='Bearer ' + jwt_access)

        status_code = response.status_code
        api_response = response.data

        self.assertEqual(status_code, 201)
        self.assertEqual(api_response['email'], 'voluntario_2@example')

    def test_adoptante_create(self):
        """Test case for adoptante create"""

        jwt_response = self.client.post(
            '/api/token/', {'email': 'admin@example.com', 'password': 'admin123'}, format='json')
        jwt_access = jwt_response.data['access']

        data = {
            'email': 'adoptante_2@example',
            'password': 'adoptante123',
            'first_name': 'Adoptante',
            'last_name': '2',
            'role': 'ADOPTANTE'
        }

        response = self.client.post(
            '/api/adoptantes/', data, format='json', HTTP_AUTHORIZATION='Bearer ' + jwt_access)

        status_code = response.status_code
        api_response = response.data

        self.assertEqual(status_code, 201)
        self.assertEqual(api_response['email'], 'adoptante_2@example')

    def test_animal_create(self):
        """Test case for animal create"""

        jwt_response = self.client.post(
            '/api/token/', {'email': 'admin@example.com', 'password': 'admin123'}, format='json')
        jwt_access = jwt_response.data['access']

        data = {
            'nombre': 'Animal 2',
            'edad': 2,
            'raza': 'raza 2',
            'tipo': 'PERRO',
            'estado': 'EN_ADOPCION'
        }

        response = self.client.post(
            '/api/animales/', data, format='json', HTTP_AUTHORIZATION='Bearer ' + jwt_access)

        status_code = response.status_code
        api_response = response.data

        self.assertEqual(status_code, 201)
        self.assertEqual(api_response['nombre'], 'Animal 2')

    def test_adopcion_create(self):
        """Test case for adopcion create"""

        jwt_response = self.client.post(
            '/api/token/', {'email': 'adoptante@example.com', 'password': 'adoptante123'}, format='json')
        jwt_access = jwt_response.data['access']

        data = {
            'animal_id': self.animal.id,
            'voluntario_id': self.voluntario.id
        }

        response = self.client.post(
            '/api/adoptanteCrearAdopcion/', data, format='json', HTTP_AUTHORIZATION='Bearer ' + jwt_access)

        status_code = response.status_code
        api_response = response.data

        self.assertEqual(status_code, 200)
        self.assertEqual(api_response['message'],
                         'Adopcion realizada con exito')
