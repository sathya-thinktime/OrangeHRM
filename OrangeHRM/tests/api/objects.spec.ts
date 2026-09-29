import { test, expect } from '@playwright/test';
import { ObjectsApi } from '../../api/ObjectsApi';

test.describe('RESTful API - Objects', () => {

  test('GET all objects', async ({ request }) => {

    const objectsApi = new ObjectsApi(request);

    const response = await objectsApi.getObjects();

    console.log('Status:', response.status());

    const body = await response.json();

    console.log('Response:', body);

    expect(response.status()).toBe(200);
    expect(Array.isArray(body)).toBeTruthy();
  });

});
test('POST - Create Object', async ({ request }) => {

  const objectsApi = new ObjectsApi(request);

  const newObject = {
    name: 'Playwright Test Product',
    data: {
      year: 2026,
      price: 999.99,
      CPU_model: 'Intel Core i7',
      Hard_disk_size: '1 TB'
    }
  };

  const response = await objectsApi.createObject(newObject);

  console.log('Status:', response.status());

  const body = await response.json();

  console.log('Created Object:', body);

  expect(response.status()).toBe(200);
  expect(body.id).toBeTruthy();
  expect(body.name).toBe('Playwright Test Product');
});
test('GET - Get Object by ID', async ({ request }) => {

  const objectsApi = new ObjectsApi(request);

  const response = await objectsApi.getObject('7');

  console.log('Status:', response.status());

  const body = await response.json();

  console.log('Object:', body);

  expect(response.status()).toBe(200);
  expect(body.id).toBe('7');
  expect(body.name).toBeTruthy();
});
test('PUT - Update Object', async ({ request }) => {

  const objectsApi = new ObjectsApi(request);

  // Create a new object
  const createResponse = await objectsApi.createObject({
    name: 'PUT Test Product',
    data: {
      year: 2025,
      price: 999.99,
      CPU_model: 'Intel Core i5',
      Hard_disk_size: '1 TB'
    }
  });

  expect(createResponse.status()).toBe(200);

  const createdObject = await createResponse.json();
  const objectId = createdObject.id;

  console.log('Created Object ID:', objectId);

  // Update the newly created object
  const updatedObject = {
    name: 'Updated PUT Product',
    data: {
      year: 2026,
      price: 1499.99,
      CPU_model: 'Intel Core i9',
      Hard_disk_size: '2 TB'
    }
  };

  const updateResponse = await objectsApi.updateObject(
    objectId,
    updatedObject
  );

  console.log('PUT Status:', updateResponse.status());

  const body = await updateResponse.json();

  console.log('Updated Object:', body);

  expect(updateResponse.status()).toBe(200);
  expect(body.id).toBe(objectId);
  expect(body.name).toBe('Updated PUT Product');
  expect(body.data.price).toBe(1499.99);
});
test('DELETE - Delete Object', async ({ request }) => {

  const objectsApi = new ObjectsApi(request);

  // Create a new object
  const createResponse = await objectsApi.createObject({
    name: 'DELETE Test Product',
    data: {
      year: 2026,
      price: 499.99
    }
  });

  expect(createResponse.status()).toBe(200);

  const createdObject = await createResponse.json();
  const objectId = createdObject.id;

  console.log('Created Object ID:', objectId);

  // Delete the object
  const deleteResponse = await objectsApi.deleteObject(objectId);

  console.log('DELETE Status:', deleteResponse.status());

  expect(deleteResponse.status()).toBe(200);

  // Verify object is deleted
  const getResponse = await objectsApi.getObject(objectId);

  console.log('GET After DELETE Status:', getResponse.status());

  expect(getResponse.status()).toBe(404);
});