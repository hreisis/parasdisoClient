import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform } from 'react-animation-components';

function RenderCard({item, isLoading, errMess}) {
    if (isLoading) {
        return <Loading />;
    }
    if (errMess) {
        return <h4>{errMess}</h4>;
    }
    return (
        <FadeTransform
            in
            transformProps={{
                exitTransform: 'scale(0.5) translateY(50%)'
            }}>
             <Card>
                <CardImg src={baseUrl + item.image} alt={item.name} />
                <CardBody>
                    <CardTitle>{item.name}</CardTitle>
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

function Home(props) {
    return (
        <div className='container'>
            <br/>
            <div className='row'>
                <div className='col-md m-1'>
                    <h2>Featured Item</h2>
                    <RenderCard
                        item={props.tea}
                        isLoading={props.teasLoading}
                        errMess={props.teasErrMess}
                    />
                </div>
                <div className='col-md m-1'>
                    <h2>Promotion this month</h2>
                    <RenderCard
                        item={props.promotion}
                        isLoading={props.promotionLoading}
                        errMess={props.promotionErrMess}
                    />
                </div>
                <div className='col-md m-1'>
                    <h2>Our partner promotion</h2>
                    <RenderCard 
                        item={props.partner}
                        isLoading={props.partnerLoading}
                        errMess={props.partnerErrMess}
                    />
                </div>
            </div>        <br />
        </div>

    );
}

export default Home;