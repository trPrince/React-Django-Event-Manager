import React, { useState, useEffect } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    Label,
} from "reactstrap";
import axios from 'axios';
import { countryList } from "./countries";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function CustomModal(props) {
    const [currentName, setCurrentName] = useState("");
    const [currentLocation, setCurrentLocation] = useState("Afghanistan");
    const [currentDate, setCurrentDate] = useState(new Date().toJSON());
    const { toggle, onSave, activeId = undefined, show } = props;
    
    useEffect(
        () => {
          const dataFetcher = async () => {
            let result = await axios(`http://127.0.0.1:8000/api/events/${activeId}/`);
              return result.data;
          }
          if(!!activeId) {
            dataFetcher().then(val => {
                setCurrentName(val.name);
                setCurrentLocation(val.location);
                setCurrentDate(val.date);
              });   
          }
          else {
            setCurrentName("");
            setCurrentLocation("Afghanistan");
            setCurrentDate(new Date().toJSON());
          }

        }
    ,[activeId]);    

    const handleNameChange = e => {
        let { value } = e.target;
        setCurrentName(value);
    };

    const handleLocationChange = e => {
        let { value } = e.target;
        setCurrentLocation(value);
    };

    const handleDateChange = e => {
        let { value } = e.target;
        setCurrentDate(value);
    };

    return (
        <Modal 
            isOpen={show}
            toggle={toggle}
            fullscreen='xl'
            backdrop='static' 
            // backdrop="static"
            // keyboard={false}
        >
            <ModalHeader>
                Events
                <div style={{"display":"flex"}}>
                    <div style={{"fontSize":"14px", "color":"gray", "marginTop": "8px"}}>
                        {!!activeId? 'Edit ':'Create '}an Event
                    </div>
                    <button className='btn btn-link' onClick={toggle}>Back</button>
                </div>
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="Name">Name</Label>
                        <Input 
                          type="text"
                          name="Name"
                          value={currentName}
                          onChange={handleNameChange}
                          placeholder="Enter event name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Location">Location</Label>
                        <Input
                        type="select"
                        name="Location"
                        value={currentLocation}
                        onChange={handleLocationChange}
                        >
                            {countryList.map((country,idx) => <option
                                key={idx}
                            >
                                {country}
                            </option>)}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="Date">Date</Label><br/>
                            <input
                            type="datetime"
                            name="Date"
                            value={currentDate}
                            onChange={handleDateChange} 
                            />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button 
                    color="primary"
                    onClick={() => {
                        onSave({
                            "name": currentName,
                            "location": currentLocation,
                            "date": currentDate,
                    })}}
                >
                    {!!activeId? 'Update':'Create'}
                </Button>
            </ModalFooter>
        </Modal>
    );
}