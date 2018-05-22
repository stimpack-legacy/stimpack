<?php

/* CASE EMPTY INBUT BOX ***************************************/

const EMPTY_PSEUDO_CODE = 
"";

const EMPTY_PSEUDO_CODE_WITH_DIRT =
" 

   ";



/* CASE SINGLE MODEL IN INBUT BOX ***************************************/

const MODEL_WITH_TWO_ATTRIBUTES = 
"Car
color
brand";

const MODEL_WITH_TWO_ATTRIBUTES_PRECIDING_DIRT = 
"
Car
color
brand
";

const MODEL_WITH_TWO_ATTRIBUTES_TRAILING_DIRT = 
"Car
color
brand

";

const MODEL_WITH_TWO_ATTRIBUTES_EXTRA_SPACES = 
" 
  Car  
color 
 brand

 ";

const MODEL_WITH_TWO_ATTRIBUTES_WITH_INTERNAL_SPACING = 
"Car
color possibly we want to pass extra args here and internal spaces should therefor be allowed but not these:   
brand";



/* CASE MULTIPLE MODELS IN INBUT BOX ***************************************/

const THREE_MODEL_WITH_ATTRIBUTES =
"Car
color
brand

User
name
hasDriversLicense

Garage
size";

const THREE_MODEL_WITH_ATTRIBUTES_PRECIDING_DIRT =
"    Car
color
brand

User
name
hasDriversLicense

Garage
size";

const THREE_MODEL_WITH_ATTRIBUTES_TRAILING_DIRT =
"Car
color
brand

User
name
hasDriversLicense

Garage
size 
";

const THREE_MODEL_WITH_ATTRIBUTES_EXTRA_SPACES =
"Car 
 color
brand 
 
User 
      name
 hasDriversLicense

Garage 
size";

const MODEL_ENDING_WITH_IS_AND_RELATIONSHIP =
"User
name

Penis
user_id";