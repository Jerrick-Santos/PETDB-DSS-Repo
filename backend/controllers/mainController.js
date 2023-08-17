

function HIVmodule(plhiv, mother_hiv, sex_active){
    //TODO: Interprets the values of the HIV health assessment 
    var plhiv_val
    if(plhiv == 1|| mother_hiv == 1 || sex_active == 1){
        plhiv_val = 1
    }
    else if ( plhiv == 0 && mother_hiv == 0 && sex_active == 0){
        plhiv_val = -1
    }
    else{
        plhiv_val = -1
    }

    return plhiv_val
}

function cardinalSympModule(cough, fever, weight_loss, night_sweats){
    if(cough == 1 || fever == 1 || weight_loss == 1 || night_sweats == 1){
        return 1
    }
    else{
        return -1
    }
}

function EPTBSympModule(gibbus_deform, non_painful_ecl, stiff_neck, drowsy, 
    pleural_effusion, pericard_effusion, dist_abdomen,
    non_painful_ejoint, tuberculin_hyper){
    //TODO: Interprets the values of the HIV health assessment 

    if(gibbus_deform == 1 ||  non_painful_ecl == 1 || stiff_neck == 1 || drowsy == 1 || 
        pleural_effusion == 1 || pericard_effusion == 1 || dist_abdomen == 1 ||
        non_painful_ejoint == 1 || tuberculin_hyper){
            return 1
        }
    else {
        return -1
    }
}

function DGTestModule(){

}

function detectContactTB(){

}

function combiningModule(){

}


const diagnose = (req, res) => {

    const caseid = req.params.caseid
    
    //GET ASSESSEMENT DATA 

    //GET XRAY 

    //GET MTB 

    //GET TST 

    //TRANSFORM DATA INTO AN OBJECT via combiningModule()

}

module.exports = {}