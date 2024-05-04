import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import './Places.scss'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';

import MarkerClusterGroup from 'react-leaflet-cluster'

import data from './placesData'
import { Avatar, Button, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, List, ListItem, ListItemIcon, ListItemText, MenuItem, MenuList, Typography } from "@mui/material";
import { useState } from "react";
import { Close as CloseIcon, People, PeopleAlt, Star } from "@mui/icons-material";


const customIcon = new L.Icon({
  iconUrl: require('./location.svg').default,
  iconSize: new L.Point(40, 47),
})

const customIcon1 = new L.Icon({
  iconUrl: require('./location1.svg').default,
  iconSize: new L.Point(40, 47),
})

// NOTE: iconCreateFunction is running by leaflet, which is not support ES6 arrow func syntax
// eslint-disable-next-line
const createClusterCustomIcon = function (cluster) {
  return L.divIcon({
    html: `<span>${cluster.getChildCount()}</span>`,
    className: 'custom-marker-cluster',
    iconSize: L.point(33, 33, true),
  })
}


export default function Places(){

  const [showDialog,setShowDialog] = useState(false);
  const [dialogLocation,setDialogLocation] = useState('');

  function handleOpen(location){
    setShowDialog(true)
    setDialogLocation(location)
  }

  function handleClose(){

  }

  function launchGoogleMapDirection(lat,lng){
    let googleMapUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    window.open(googleMapUrl, '_blank', 'toolbar=0,location=1,menubar=0');
  }

    return <div sx={{width:'400px',height:'400px'}}><MapContainer center={[51.505, -0.09]} zoom={3} scrollWheelZoom={true} minZoom={3}
    maxZoom={15}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <MarkerClusterGroup 
      onClick={(e) => console.log('onClick', e)}
      iconCreateFunction={createClusterCustomIcon}
      maxClusterRadius={150}
      spiderfyOnMaxZoom={true}
      // polygonOptions={{
      //   fillColor: '#ffffff',
      //   color: '#f00800',
      //   weight: 5,
      //   opacity: 1,
      //   fillOpacity: 0.8,
      // }}
      showCoverageOnHover={false}
    >

          {data.map((node, index) => (
            <Marker key={index} position={[node.latitude, node.longitude]} icon={node.type=="b"?customIcon1:customIcon}>
              <Popup>
                <Typography variant="body">Name : {node.name.join(", ")}</Typography>
                <br />
                <Typography variant="body">ID : {node.id}</Typography>
                <br />
                <Typography variant="body">Birth Place : {node.birth_place}</Typography>
                <br />
                <Button onClick={() => handleOpen(node.birth_place)}>Show All People</Button>
                <Button onClick={() => launchGoogleMapDirection(node.latitude, node.longitude)}>Get Directions</Button>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
    <Dialog open={showDialog} onClose={()=>setShowDialog(false)} fullWidth={true}
        maxWidth={'md'}>
      <DialogTitle >Others in Family from {dialogLocation}</DialogTitle>
      <IconButton
          aria-label="close"
          onClick={()=>setShowDialog(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <List>
        {data.filter(dat=>dat.birth_place==dialogLocation).map(place=><>
          <MenuList>
            <ListItem >
              <ListItemIcon>
                <Avatar>
                  <PeopleAlt></PeopleAlt>
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={"User : "+place.name.join(", ")} secondary={"Id : "+place.id}></ListItemText>
          {/* <Typography>User : {place.name.join(", ")}</Typography>
          <Typography>Id : {place.id}</Typography> */}
          </ListItem>
          </MenuList>
        </>)}
        </List>
      </DialogContent>
    </Dialog>
    
  </MapContainer></div>
}