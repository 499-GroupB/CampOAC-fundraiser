import React from 'react';
import ReactDOM from 'react-dom/client';
import { Page, Text, View, Document, StyleSheet, ReactPDF } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {},
    name: {},
    pickupLoc: {},
    total: {},
    payType: {},
    paidCash: {},
});

function genInvoice(order){
    const paidCash = false;
    if(order.payType=='cash') paidCash=true;
    
    const nameDisp = 'Name: '+order.firstName+' '+order.lastName;
    const priceDisp = 'Total: $'+(order.numBags*bagPrice);
    const payTypeDisp = 'Payment Method: '+order.payType;
    const pickupLocDisp = 'Pickup Address: '+order.pickupLoc;
    const paidCashDisp = paidCash ? 'CASH PAYMENT DUE ON PICKUP' : '';

    const invoice = () => (
        <Document>
            <Page size='A4' style={styles.page}>
                <View style={styles.name}>
                    <Text>{nameDisp} </Text>
                </View>
                <View style={styles.total}>
                    <Text>{priceDisp}</Text>
                </View>
                <View style={styles.payType}>
                    <Text>{payTypeDisp}</Text>
                </View>
                <View style={styles.pickupLoc}>
                    <Text>{pickupLocDisp}</Text>
                </View>
                <View style={styles.paidCash}>
                    <Text>{paidCashDisp}</Text>
                </View>
            </Page>
        </Document>
    );

    ReactPDF.render(<invoice />, `${__dirname}/example.pdf`);
}
