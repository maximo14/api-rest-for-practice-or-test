# Api rest para uso general

## Documentacion

**Title**

----

  <_Additional information about your API call. Try to use verbs that match both request type (fetching vs modifying) and plurality (one vs multiple)._>

* **URL**

  <_The URL Structure (path only, no root url)_>

* **Method:**
  
  <_The request type_>

  `GET` | `POST` | `DELETE` | `PUT`
  
*  **URL Params**

   <_If URL params exist, specify them in accordance with name mentioned in URL section. Separate into optional and required. Document data constraints._> 

   **Required:**
 
   `id=[integer]`

   **Optional:**
 
   `photo_id=[alphanumeric]`

* **Data Params**

  <_If making a post request, what should the body payload look like? URL Params rules apply here too._>

* **Success Response:**
  
  <_What should the status code be on success and is there any returned data? This is useful when people need to to know what their callbacks should expect!_>

  * **Code:** 200 <br />
    **Content:** `{ id : 12 }`
 
* **Error Response:**

  <_Most endpoints will have many ways they can fail. From unauthorized access, to wrongful parameters etc. All of those should be liste d here. It might seem repetitive, but it helps prevent assumptions from being made where they should be._>

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error : "Log in" }`

  OR

  * **Code:** 422 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error : "Email Invalid" }`

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 



----
----
blablablablablalablablablala

 **Users**

----

 Los metodos POST,DELETE y PUT necesitan token de auntnticacion y permisos de Admin o Encargado de Productos para ser usados.
 El metodo GET no requiere token, ni permisos

* **URL**

  /api/users o /api/users/:id o /api/users?id=:id

* **Method:** 
 
  `GET` | `POST` | `DELETE` | `PUT`
  
*  **URL Params** 
  
   **Required:**
 
   `_id=[String]`

   **Optional:**

   `nombre=[String]`
   `marca=[String]`
   `precio=[Numerico]`

* **Data Params**

   {
      nombre: [String],
      marca: [String],
      precio: [Numerico],
      foto: [URL/String]
    }
    * **EXAMPLE**

     {  nombre: "Billetera",
        marca: "nike",
        precio: 15,
        foto: "https://www.renzocosta.com/media_rc/uploads/productos/hombre/billeteras/billetera-cuero-hombre-negro-verde-wcs-14-14100127-01.jpg"
    }

* **Success Response:**   

  * **Code:** 200 <br />
    **Content:** `{
        "_id": "599c4d0fbe48e2fc0c9c7aa4",
        "nombre": "Billetera",
        "marca": "nike",
        "precio": 15,
        "foto": "https://www.renzocosta.com/media_rc/uploads/productos/hombre/billeteras/billetera-cuero-hombre-negro-verde-wcs-14-14100127-01.jpg"
    }`

  * **Code:** 201 <br />
    **Content:** `{
        "_id": "599c4d0fbe48e2fc0c9c7aa4",
        "nombre": "Billetera",
        "marca": "nike",
        "precio": 15,
        "foto": "https://www.renzocosta.com/media_rc/uploads/productos/hombre/billeteras/billetera-cuero-hombre-negro-verde-wcs-14-14100127-01.jpg"
    }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error: "Tu petición no tiene cabecera de autorización" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error: "El token enviado no es un token valido" }`
  
  * **Code:** 403 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error: "No tienes permiso para acceder a la ruta /api/productos"}`

  * **Code:** 403 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error: "No tienes permisos para realizar esta acccion: POST|PUT|DELETE" }`

  * **Code:** 403 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error: "El usuario no es valido" }`
    
  

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

  En proceso....

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 

  En proceso....

bla bla bla blablavlal ssd


**SingIn/SingUp**

----

 Los metodos POST,DELETE y PUT necesitan token de auntnticacion y permisos de Admin o Encargado de Productos para ser usados.
 El metodo GET no requiere token, ni permisos

* **URL**

  /api/singin ---> para loguiar
  /api/singup ---> para registrar

* **Method:** 
 
  `POST`
  
*  **URL Params** 

   `No have`
  
* **Data Params**
  
  **Para singin**

  {  nombre: [String],
     password: [String]
  }

  **Para singup**
  {}

* **Success Response:**   

  * **Code:** 200 <br />
    **Content:** `{
        "_id": "599c4d0fbe48e2fc0c9c7aa4",
        "nombre": "Billetera",
        "marca": "nike",
        "precio": 15,
        "foto": "https://www.renzocosta.com/media_rc/uploads/productos/hombre/billeteras/billetera-cuero-hombre-negro-verde-wcs-14-14100127-01.jpg"
    }`

  * **Code:** 201 <br />
    **Content:** `{
        "_id": "599c4d0fbe48e2fc0c9c7aa4",
        "nombre": "Billetera",
        "marca": "nike",
        "precio": 15,
        "foto": "https://www.renzocosta.com/media_rc/uploads/productos/hombre/billeteras/billetera-cuero-hombre-negro-verde-wcs-14-14100127-01.jpg"
    }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error: "Tu petición no tiene cabecera de autorización" }`

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ error: "El token enviado no es un token valido" }`
  
  * **Code:** 403 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error: "No tienes permiso para acceder a la ruta /api/productos"}`

  * **Code:** 403 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error: "No tienes permisos para realizar esta acccion: POST|PUT|DELETE" }`

  * **Code:** 403 UNPROCESSABLE ENTRY <br />
    **Content:** `{ error: "El usuario no es valido" }`
    
  

* **Sample Call:**

  <_Just a sample call to your endpoint in a runnable format ($.ajax call or a curl request) - this makes life easier and more predictable._> 

  En proceso....

* **Notes:**

  <_This is where all uncertainties, commentary, discussion etc. can go. I recommend timestamping and identifying oneself when leaving comments here._> 

  En proceso....
 