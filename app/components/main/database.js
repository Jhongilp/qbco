export const DB = (function DB() {
  
  const config = {
    apiKey: "AIzaSyBB-mhYGsm-1iF2Ksv2Y2wnAktGU0Fh-0I",
    authDomain: "qbco-8373d.firebaseapp.com",
    databaseURL: "https://qbco-8373d.firebaseio.com",
    projectId: "qbco-8373d",
    storageBucket: "qbco-8373d.appspot.com",
    messagingSenderId: "568598711654"
  };
  
  firebase.initializeApp(config);
  const database = firebase.database();
  const ref = database.ref('inventario');
  
  function createItem(item) {
    ref.push(item);
  }
  
  // Este método debe llamarse pero ingresando la función getData desde el submodule Editar con el método addRow
  function retrieveData(fnAddRow) {
    // Read the docs for Firebase.on method. It needs a callback to handle/display the changes
    // fnAddRow --> resumenArea.addRowItem.bind(resumenArea)
    ref.on('value', fnAddRow, errData);
  }
  
  function deleteData(itemsCodeArr) {
    // itemsCodeArr is an array with all the item's code the user selected to be deleted.
    // With the code info we will match the item save in the database
    ref.on('value', function(inventario) {
      if (inventario.val()) {
        const inventarioObj = inventario.val();
        // ref.on returns the whole 'inventario' object
        const itemKeyDB = Object.keys( inventarioObj ); // Firebase asign a random unique key for each data object
        for (let i = 0; i < itemsCodeArr.length; i++) {
          // 'selectedItemCode' will refer to the product's code which input was checked by the user...
          // regarding to the item to be deleted
          const selectedItemCode = itemsCodeArr[i]; 
          for (let j = 0; j < itemKeyDB.length; j++) {
            const itemRefKey = itemKeyDB[j]; // This is the current child's key for the Firebase 'inventario' object
            const itemCodeDB = inventarioObj[itemKeyDB[j]]['cod']; // Get the 'code' for the item saved in DB
            if (selectedItemCode === itemCodeDB) {
              const itemRow = database.ref('inventario/' + itemRefKey);
              itemRow.remove();
              // .then(function() {
              //   console.log('Item was succesfully deleted');
              // })
              // .catch(function(error) {
              //   console.log('Failure: ' + error);
              // });
            }
          }
        }  
      }
      
    });
  }
  
  function errData(err) {
    console.log('Error is: ' + err);
  }
  
  return {
    createItem: createItem,
    retrieveData: retrieveData,
    deleteData: deleteData
  };
  
})();
