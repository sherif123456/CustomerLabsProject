//import { isContentEditable } from '@testing-library/user-event/dist/utils';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useState} from 'react';
import './SegmentForm.css';
import Button from 'react-bootstrap/Button';
import ReactTooltip from "react-tooltip";

const DEFAULT_VALUE = 'Add schema to segment';

toast.configure()
function SegmentForm(props){
    const [segmentName, setSegmentName] = useState('');
    const [selectedSchemas, setSelectedSchemas] = useState([]);
    const [newSchema, setNewSchema] = useState(DEFAULT_VALUE);
    const [schemas, setSchemas] = useState([
        {label: "First Name", Value: 'first_name'},
        {label: "Last Name", Value: 'last_name'},
        {label: "Gender", Value: 'gender'},
        {label: "Age", Value: 'age'},
        {label: "Account Name", Value: 'account_name'},
        {label: "City", Value: 'city'},
        {label: "State", Value: 'state'}
    ]);
  
    const addNewSchema = function(){
        if (newSchema===DEFAULT_VALUE) return;
        setSelectedSchemas([...selectedSchemas, ...schemas.filter(item => item.Value===newSchema)]);
        setSchemas([...schemas.filter(item => item.Value!==newSchema)]);
        setNewSchema(DEFAULT_VALUE);
    };
    const changeSelectedSchema = function(idx, newValue) {
        const newSchema = schemas.filter(item => item.Value===newValue);
        const schemaRemoved = selectedSchemas.slice(idx, idx+1);
        setSelectedSchemas([...selectedSchemas.slice(0,idx), ...newSchema, ...selectedSchemas.slice(idx+1)]);
        setSchemas([...schemas.filter(item => item.Value!==newValue), ...schemaRemoved])
    };

    //newly added RemoveSchemas
    const removeSchema = function(idx, newValue) {
        const newSchema = schemas.filter(item => item.Value===newValue);
        const schemaRemoved = selectedSchemas.slice(idx, idx+1);
        setSelectedSchemas([...selectedSchemas.slice(0,idx), ...newSchema, ...selectedSchemas.slice(idx+1)]);
        setSchemas([...schemas.filter(item => item.Value!==newValue), ...schemaRemoved])
    };



    const handleSave = async function(){
        const url = 'https://webhook.site/835107aa-ba72-48ba-ab21-dccbcb9e3c99';

        if (segmentName && selectedSchemas.length>0) {
            const content = {
                "segment_name": segmentName,
                "schema": selectedSchemas.map(item => {
                    return {[item.Value]: item.label};
                })
            };
            try{
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(content)
                });
                console.log(response);
            } catch(error){
                console.log(error);
                // alert('Sorry unable to update the segment');
                toast.error("Sorry unable to update the segment")
            }
            toast.success("Succesfully saved!!");
        } else {
            // alert('Please enter segment name and select schemas to add');
            toast.warning("Please enter segment name and select schemas to add")
        }
    }
    return (
        <div className="segment-form">
            <div className="description">Enter the Name of the Segment</div>
            <input value={segmentName} onChange={(event) => setSegmentName(event.target.value)} placeholder="Name of the segment"></input>
            <div className="description">To save your segment, you need to add the schemas to build the query</div>
            {Object.keys(selectedSchemas).length>0 && 
                <div className="segment-list">
                    {selectedSchemas.map((item, idx) => {
                        return (
                            <div className="segment-item">
                                {/* <span className='indicator'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> */}
                                <select key={idx} value={selectedSchemas[idx].Value} onChange={(event) => changeSelectedSchema(idx, event.target.value)}>
                                    <option key={99} value={item.Value}>{item.label}</option>
                                    {schemas.filter(item => !selectedSchemas.includes(item.Value)).map((item, idx) => (<option key={idx} value={item.Value}>{item.label}</option>))}
                                </select>
                                <button data-tip data-for="removeTip" className="remove-icon" onClick={(event) => removeSchema(idx, event.target.value)}>
                                    &nbsp;
                                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                    &nbsp;
                                </button>
                                <ReactTooltip id="removeTip" place="top" effect="solid">
                                    Remove Input
                                </ReactTooltip>
                            </div>
                        )
                    })}
                </div>
            }
            <div className='add-segment'>
                <div className="segment-item">
                    <span className=''></span>
                    <select value={newSchema} onChange={(event) => setNewSchema(event.target.value)}>
                        <option key={99} value={DEFAULT_VALUE} disabled hidden>{DEFAULT_VALUE}</option>
                        {schemas.filter(item => !selectedSchemas.includes(item.Value)).map((item, idx) => (<option key={idx} value={item.Value}>{item.label}</option>))}
                    </select>
                </div>
                <div data-tip data-for="addTip" className="add-schema-button" onClick={() => addNewSchema()}>+ Add new schema</div>
                <ReactTooltip id="addTip" place="left" effect="solid">
                                   Add Input
                     </ReactTooltip>
            </div>
            <div className='action-container'>
                <div>
                    <Button  color='primary' className='btnSaveseg' onClick={handleSave}>Save the segment</Button>
                    
                   
                </div>
            </div>
        </div>
    );
}

export default SegmentForm;