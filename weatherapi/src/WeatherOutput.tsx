import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from "react";
import { Alert } from 'react-bootstrap';

const WeatherOutput = (props: { response: { location: { name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }; current: { cloud: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }; }; }) => {

    return (
        <>
            <Alert key="success" variant="success">
                <p>Cloud: {props.response.current.cloud}</p>
                <p>City: {props.response.location.name}</p>
            </Alert>
        </>
    )

}
export default WeatherOutput;