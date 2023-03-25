module.exports = ({ firstName, lastName, phone, pickUp, numBags, payment, date, _id, orderTotal }) => {
    var adminPhone;
    var adminName;
    var address = 'temp';
    Location.findOne({ name: pickUp}, 'contact adminId', (err, location) =>{ //add address field once implemented in location model
        adminPhone = location.contact;
        Admin.findbyId(location.adminId, 'firstName lastName', (err, admin) =>{
            adminName = admin.firstName+' '+admin.lastName;
        });
    });
    
    return `
        <!doctype html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>PDF Result Template</title>
                <style>
                    #page {
                        border: 1px solid black;
                        margin: 10px;
                        padding: 5px;
                        font-family: 'Times New Roman';}
                    h2 {
                        text-align: center;
                        color: gray;
                    }
                    .invoiceLineItem {
                        border: 1px solid black;
                        margin: 5px;
                        padding: 1px;
                        font-size: 16px;
                        line-height: 24px;
                        font-family: 'Times New Roman';
                    }
                </style>
            </head>
            <body>
                <div id='page'>
                    <div id='title'><h2>Camp OAC Firewood Invoice</h2></div>
                    <br>
                    <div id='date' class='invoiceLineItem'><p>Date: ${date}</p></div>
                    <div id = 'orderNum' class='invoiceLineItem'>
                        <p>Order Number: ${_id}</p>
                    </div>
                    <div id='name' class='invoiceLineItem'>
                        <p>Customer Name: ${firstName} ${lastName} </p>
                        <p>Customer Phone: ${phone} </p>
                    </div>
                    <div id='total' class='invoiceLineItem'>
                        <p>Number of Bags: ${numBags} Price: 8.00<p>
                        <p>Total: ${orderTotal}</p>
                        <p>Payment type: ${payment}</p>
                        <p style='text-align:center'>If paid by cash customer must present invoice at time of pick up</p>
                    </div>
                    <div id='address' class='invoiceLineItem'>
                        <p> Your order will be available for pick up at ${address}. Contact ${adminName} at ${adminPhone} to schedule a time.</p>
                    </div>
                </div>
            </body>
        </html>
    `;
};