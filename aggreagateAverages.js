function onOpen() {
  // adds menu to update or refresh data
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [ {name: "Refresh Data", functionName: "runUpdate"}];
  ss.addMenu("PLA", menuEntries); 
}

function runUpdate() {
  // onOpen opens the teachers' spreadsheets by the "Teacher Google Doc Key"
  // column and then populates updates the teacher's metrics row
  
  // open this spreadsheet to read in teacher's google doc key
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
 
  // Get range of teacher keys
  var teacherKeyRange =  ss.getRange("B2:F100");
 
  // set the row and column where the copied data will be written 
  var cellRow = 2;
  var cellColumn = 4;

  // Load the cells into a 2D array
  var values = teacherKeyRange.getValues();



  // Open teacher google docs by keys in column B and then and populate cells
  var str = "";
  var objs = [];
  var obj = {};
  var hasData = false;
  for (var i = 0; i < values.length; i++) {
    // get the key
    var cellData = values[i][0];
    
    // only open the teacher google spreadsheet if cell has a key
    if (! isCellEmpty(cellData)) {
      var teacherSpreadsheet = SpreadsheetApp.openById(cellData);
      var teacherSheet = teacherSpreadsheet.getSheets()[0];
      var teacherDataRange = teacherSheet.getRange("B3:AA3");
      // sheet.getRange(cell_Row, cell_Column).setValue(ret_value);
      var aveValues = teacherDataRange.getValues();
      var tempStr = "";
      for (var j=0; j < teacherDataRange.getNumColumns(); j++) {
        tempStr += aveValues[0][j] + " ";
        var teacherRowData = aveValues[0][j];
        if (! isCellEmpty(teacherRowData)) {  
          sheet.getRange(cellRow+i, cellColumn+j).setValue(teacherRowData);
        } // end if isCellEmpty
      } // end for teacherDataRange
    } // end if isCellEmpty
  } // end for values
}
                                      
  
// Returns true if the cell where cellData was read from is empty.
// Arguments:
//   - cellData: string
function isCellEmpty(cellData) {
  return typeof(cellData) == "string" && cellData == "";
}


