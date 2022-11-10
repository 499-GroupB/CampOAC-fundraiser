import React from 'react';
import ReactDOM from 'react-dom/client';
import { Page, Text, View, Document, StyleSheet, ReactPDF } from '@react-pdf/renderer';




function Order(props){
    return(
        <Invoice 
            firstName = ''
            lastName = ''
            numBags = ''
            payType = ''
            paidCash = ''
            pickupLoc = ''
        />
    );
}
class Invoice extends React.Component {
    constructor(props){
        super(props);
        this.styles = StyleSheet.create({
            page: {},
            name: {},
            pickupLoc: {},
            total: {},
            payType: {},
            paidCash: {},
        });
        this.props.bagPrice = '';
    }
    genInvoice(){
        const nameDisp = 'Name: '+this.props.firstName+' '+this.props.lastName;
        const priceDisp = 'Total: $'+(this.props.numBags*this.props.bagPrice);
        const payTypeDisp = 'Payment Method: '+this.props.payType;
        const pickupLocDisp = 'Pickup Address: '+this.props.pickupLoc;
        const paidCashDisp = this.props.paidCash ? 'CASH PAYMENT DUE ON PICKUP' : '';

        const invoice = () => (
            <Document>
                <Page size='A4' style={this.styles.page}>
                    <View style={this.styles.name}>
                        <Text>{nameDisp} </Text>
                    </View>
                    <View style={this.styles.total}>
                        <Text>{priceDisp}</Text>
                    </View>
                    <View style={this.styles.payType}>
                        <Text>{payTypeDisp}</Text>
                    </View>
                    <View style={this.styles.pickupLoc}>
                        <Text>{pickupLocDisp}</Text>
                    </View>
                    <View style={this.styles.paidCash}>
                        <Text>{paidCashDisp}</Text>
                    </View>
                </Page>
            </Document>
        );

        ReactPDF.render(<invoice />, `${__dirname}/example.pdf`);
    }
    return()
    

    

    
}