import { publishTypes } from '../constants/publishTypes';

export function getPublishType(listing){
    if (listing.publishStatus === "Draft" && listing.listing.latestApprovedId){
        return publishTypes.DRAFT_WITH_LIVE;
    }
    if (listing.publishStatus === "On Market" && listing.listing.latestDraftId){
        return publishTypes.LIVE_WITH_DRAFT;
    }
    if (listing.publishStatus === "Draft" && !listing.listing.latestApprovedId){
        return publishTypes.ONLY_DRAFT;
    }
    if (listing.publishStatus === "On Market" && !listing.listing.latestDraftId){
        return publishTypes.ONLY_LIVE;
    }
}

export function formatDate(date){
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

export function formatDateTime(d) {
    var date = new Date(d);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}

function addNameValuePair(label, value, prefix, unit, nameValuePairs){
    var nameValuePair = {
        label: label,
        value: value,
        prefix: prefix,
        unit: unit
    }
    nameValuePairs.push(nameValuePair);
}

// Convert Space details to a set of name value pairs
export function spaceNameValuePairs(space){
    var nameValuePairs = [];

    if (space.type){
        addNameValuePair("Lease Type", space.type, null, null, nameValuePairs);
    }
    if (space.driveInDoors){
        addNameValuePair("Drive in Doors", space.driveInDoors, null, "door(s)", nameValuePairs);
    }
    if (space.floors){
        addNameValuePair("Floors", space.floors, null, "floor(s)", nameValuePairs);
    }
    if (space.divisible){
        addNameValuePair("Divisible?", space.divisible, null, null, nameValuePairs);
    }
    if (space.loadingDocks){
        addNameValuePair("Loading Docks", space.loadingDocks, null, "dock(s)", nameValuePairs);
    }
    if (space.leaseTerm){
        addNameValuePair("Lease Term", space.leaseTerm, null, null, nameValuePairs);
    }
    if (space.ceilingHeight){
        addNameValuePair("Ceiling Height", space.ceilingHeight, null, "ft", nameValuePairs);
    }
    if (space.availableDate){
        var availableDate = formatDate(space.availableDate);
        addNameValuePair("Available Date", availableDate, null, null, nameValuePairs);
    }
    if (space.nets){
        addNameValuePair("Nets", space.nets, "$", null, nameValuePairs);
    }
    if (space.class){
        addNameValuePair("Class", space.class, null, null, nameValuePairs);
    } 
    return nameValuePairs;
}
// Convert Building Details to a set of name value pairs
// Used in display and reporting
export function generalNameValuePairs(listing){

    var nameValuePairs = [];
    var nameValuePair = {};

    if (listing.propertyType){
        nameValuePair = {
            label: "Property Type",
            value: listing.propertyType,
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.totalBuildingSize){
        nameValuePair = {
            label: "Building Size",
            value: listing.totalBuildingSize.toString(),
            unit: "sq ft"
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.lotSize){
        nameValuePair = {
            label: "Lot Size",
            value: listing.lotSize,
            units: "acres"
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.taxes){
        nameValuePair = {
            label: "Taxes",
            prefix: "$",
            value: listing.taxes,
            unit: "per yr"
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.parking){
        nameValuePair = {
            label: "Parking",
            value: listing.parking.toString(),
            unit: "spaces(s)"
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.floors){
        nameValuePair = {
            label: "Floors",
            value: listing.floors.toString(),
            unit: "floor(s)"
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.totalNumberOfUnits){
        nameValuePair = {
            label: "Units",
            value: listing.totalNumberOfUnits.toString(),
            unit: "unit(s)"
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.buildingClass){
        nameValuePair = {
            label: "Building Class",
            value: listing.buildingClass
        };
         nameValuePairs.push(nameValuePair);
    }
    if (listing.ceilingHeight){
        nameValuePair = {
            label: "Ceiling Height",
            value: listing.ceilingHeight,
            unit: "ft"
        };
         nameValuePairs.push(nameValuePair);
    }
    if (listing.driveInDoors){
        nameValuePair = {
            label: "Drive in Doors",
            value: listing.driveInDoors.toString(),
            unit: "door(s)"
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.loadingDocks){
        nameValuePair = {
            label: "Loading Docks", 
            value: listing.loadingDocks.toString(),
            unit: "dock(s)"
        };
         nameValuePairs.push(nameValuePair);
    }
    if (listing.yearBuilt){
        nameValuePair = {
            label: "Year Built",
            value: listing.yearBuilt.toString()
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.zone){
        nameValuePair = {
            label: "Zone",
            value: listing.zone
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.totalAvailableSpace){
        nameValuePair = {
            label: "Total Space",
            value: listing.totalAvailableSpace,
            unit: "sq ft"
        };
        nameValuePairs.push(nameValuePair);
    }
    if (listing.nets){
        nameValuePair = {
            label: "Nets",
            prefix: "$",
            value: listing.nets,
            unit: "per month"
        };
        nameValuePairs.push(nameValuePair);
    }
    return nameValuePairs;
}



export function abbrState(input, to){
    
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];
    var i = 0;
    if (to === 'abbr'){
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(i = 0; i < states.length; i++){
            if(states[i][0] === input){
                return(states[i][1]);
            }
        }    
    } else if (to === 'name'){
        input = input.toUpperCase();
        for(i = 0; i < states.length; i++){
            if(states[i][1] === input){
                return(states[i][0]);
            }
        }    
    }
}
