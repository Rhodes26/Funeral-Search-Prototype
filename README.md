# Funeral Search 
Originally made for Families searching funeral homes in their local area.
Families could directly send messages to the funeral home, look at funeral profile cards, and compare price information.
Implemented back end development to my project; Express, Node, SQLite 
Became complex; Feature Creep; so I removed the dashboard section.
This is a striped down version of it.

#### Home Page 
<img width="1902" height="856" alt="Fuenral search picture " src="https://github.com/user-attachments/assets/cc73b18e-1b19-475c-8f66-1550143dfbc2" />


#### Search Results

<img width="953" height="397" alt="Search F S" src="https://github.com/user-attachments/assets/1f0d14c0-49f5-4c38-949f-0801e50e4448" />

#Architecture and How it Works 
**Client Request:** the user enters the search query on frontend interface. 
**Asynchronous Fetch:** JavaScript intercepts the profile using GET from express js, while express fetch api endpoint.
**Database:**  express server request from sqlite database to select the following data.

#Data Handling# 
**Mockdataset:** Populated sqlite database with placeholders (example *Letter A Funeral Home* with simulated links, service details etc) to safely test search queries.
**Gitignore:** extra layer of precaution.
