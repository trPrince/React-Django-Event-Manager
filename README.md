# React-Django-Event-Manager
It's a basic web application that can perform CRUD operations through API calls. We used React and Django for this project.

# Instructions for running/serving the project
* You'll need to first install the following in your device:
1. Python3
2. node.js

# Firstly, set up the backend project:
* Go to the command prompt/terminal, enter mysql and
  * Create a new database named **eventdb**(You can use this link for help: https://www.mysqltutorial.org/mysql-create-database/ )
* Open the directory where you kept the project.
* Open the terminal and then run the following commands:
  * pip install pipenv
  * pipenv shell 
  * pipenv install --dev

Open the backend/backend/settings.py file and edit in the database section:
  * Your default user might be 'root' and password might be '' (yes empty). Edit all the values accordingly.
* Then open terminal and use the following commands in your terminal:
1. python manage.py makemigrations
2. python manage.py migrate
3. python manage.py runserver

You might run into a problem where it says something like "no module named mysqlDB". In that case run the following commands:
 * sudo apt-get install libmysqlclient-dev
 * pip3 install mysqlclient

If no errors occur you'll get a link in your terminal like this: http://127.0.0.1:8000/
* Follow the link or open it using any browser and you'll have this project up and running in your device.

# Now onto the frontend part:
Run these command in your terminal:
  * npm install
  * npm start
This should open the frontend project in your default browser.
This should be it. If you face any trouble do reach out and let me know. Thanks.
  
