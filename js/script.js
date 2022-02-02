/**
          * You must include the dependency on 'ngMaterial' 
          */
         var data = [
         {title: 'Gender', content: "GENDER", image: "images/sex.jpg", disabled: false},
		 {title: 'Age', content: "AGE", image: "", disabled: false},
         {title: 'Waist circumference', content: "WAIST CIRCUMFERENCE (IN CM)", image: "images/waist.jpg", disabled: false},
         {title: 'Physical activity', content: "PHYSICAL ACTIVITY",  image: "images/physAct.jpg", disabled: false},
         {title: 'High blood sugar', content: "HISTORY OF HIGH BLOOD SUGAR", image: "images/bloodSugar.jpg", disabled: false},
         {title: 'High blood pressure', content: "HIGH BLOOD PRESSURE", image: "images/highBlood.jpg", disabled: false},
         {title: 'Diabetes in family', content: "DIABETES IN FAMILY", image: "images/diabFamily.jpg", disabled: false},
         {title: 'Results', content: "RESULTS", image: "", disabled: false}]
		 
         var st = 0;
		 
         function AppCtrl ($scope, $log) {
		 $scope.Math = window.Math;
         var tabs = [{title: 'Start', content: "", info: "", image: "", disabled: true}],
         selected = null,
         previous = null;
         $scope.tabs = tabs;
         $scope.selectedIndex = 2;
         $scope.$watch('selectedIndex', function(current, old){
          previous = selected;
          selected = tabs[current];
          if ( old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
          if ( current + 1 )                $log.debug('Hello ' + selected.title + '!');
         });

		 

         $scope.addTab = function (title, view) {
			if(st==0){
			$scope.Answers = [{Question:"Question", Answer:"Answer"} ];
			}
			 $scope.submit_age = function(value) {
				$scope.var_age = value;
				$scope.Answers.push({Question:"Age" , Answer: $scope.var_age});

				};
			$scope.submit_female = function(value) {
				if(value == "f"){
					$scope.var_female = 1;
					$scope.Answers.push({Question:"Gender" , Answer: "Female"});
				}else{
					$scope.var_female = 0;
					$scope.Answers.push({Question:"Gender" , Answer: "Male"});
				}
				};	
			$scope.submit_waist = function(value) {
				$scope.var_waist = value;
				$scope.Answers.push({Question:"Waist circumference (in cm)" , Answer: $scope.var_waist});
				};	
				
			$scope.submit_bSugarHist = function(value) {
				if(value == "Yes"){
					$scope.var_bSugarHist = 1;
					$scope.Answers.push({Question:"Have you ever been found to have high blood sugar?" , Answer: "Yes"});
				}else{
					$scope.var_bSugarHist = 0
					$scope.Answers.push({Question:"Have you ever been found to have high blood sugar?" , Answer: "No"});
				}
			};	
			
			$scope.submit_physInact = function(value) {
				if(value == "Yes"){
					$scope.var_physInact = 0;
					$scope.Answers.push({Question:"Physical activity (at least 30 mins/day)" , Answer: "Yes"});
				}else{
					$scope.var_physInact = 1;
					$scope.Answers.push({Question:"Physical activity (at least 30 mins/day)" , Answer: "No"});
				}
				};	
			$scope.submit_hyperDrugs = function(value) {
				if(value == "Yes"){
					$scope.var_hyperDrugs = 1;
					$scope.Answers.push({Question:"Are you taking medicines for high blood pressure?" , Answer: "Yes"});

				}else{
					$scope.var_hyperDrugs = 0;
					$scope.Answers.push({Question:"Are you taking medicines for high blood pressure?" , Answer: "No"});
				}

				};	
			$scope.submit_diabFamClose = function(value) {
				if (value == true){
					$scope.Answers.push({Question:"Diabetes in family (parents, brothers, sisters, children)" , Answer: "Yes"});
					$scope.var_diabFamClose = 1;
				}else{
					$scope.Answers.push({Question:"Diabetes in family (parents, brothers, sisters, children)" , Answer: "No"});
					$scope.var_diabFamClose = 0;
				}
				};			
			$scope.submit_diabFamFar = function(value) {
				/*alert(value);*/
				if (value == true){
					$scope.Answers.push({Question:"Diabetes in family (grandparents, aunts, uncles, cousins)" , Answer: "Yes"});
					$scope.var_diabFamFar = 1;
				}else{
					$scope.Answers.push({Question:"Diabetes in family (grandparents, aunts, uncles, cousins)" , Answer: "No"});
					$scope.var_diabFamFar  = 0;
				}
				};					

			$scope.calculateProb = function() {
		/*
			Threshold value for T2DM is 0.1259990, 
			for prediabetes (IFG) is 0.2439808.
		*/
				
				$scope.T2D = (1/(1+ Math.exp(-(-8.492 + 0.032*$scope.var_age + 0.029*$scope.var_waist - 0.746* $scope.var_female + 0.625 * $scope.var_physInact +2.537* $scope.var_bSugarHist))));

				$scope.IFG = (1/(1+Math.exp(-(-6.483+ 0.04* $scope.var_age + 0.027* $scope.var_waist - 0.777* $scope.var_female + 0.319* $scope.var_hyperDrugs + 2.578* $scope.var_bSugarHist + 0.572* $scope.var_diabFamFar + 0.522* $scope.var_diabFamClose))));		


				if($scope.T2D > 0.1259990){
					$scope.T2D_text = "High risk (".concat((Math.round($scope.T2D*100)).toString()).concat("%)") ;
				}else{
					$scope.T2D_text = "Normal risk (".concat((Math.round($scope.T2D*100)).toString()).concat("%)");
				}
				
				if($scope.IFG > 0.2439808){
					$scope.IFG_text = "High risk (".concat((Math.round($scope.IFG*100)).toString()).concat("%)");
				}else{
					$scope.IFG_text = "Normal risk (".concat((Math.round($scope.IFG*100)).toString()).concat("%)");
				}
				
				if($scope.T2D > 0.1259990){
					$scope.smiley = "images/sad.jpg";
					$scope.OverallRisk_text_title = "HIGH RISK";
					$scope.OverallRisk_text = "Your risk of developing Type 2 Diabetes is high. We recommend that you consult your GP as it is necessary to make further inquiries, such as laboratory testing of blood sugar levels.";
				}else if ($scope.IFG > 0.2439808){
					$scope.smiley = "images/worried.jpg";
					$scope.OverallRisk_text_title = "MEDIUM RISK";
					$scope.OverallRisk_text = "Your risk of developing Type 2 Diabetes is moderate, which means that immediate action is required. Above all, it is important to eat fruits/vegetables on a daily basis and to reduce the intake of fat (fried foods, butter, margarine, and industrially produced foods), sugar (sweets, jam, honey, fruit syrups) and salt. We recommend weight loss, in case you have an increased body weight. It is also important that you are physically active for at least 150 minutes per week. Improving your lifestyle may decrease the risk of developing Type 2 Diabetes.";
				}else{
					$scope.smiley = "images/happy.jpg";
					$scope.OverallRisk_text_title = "LOW RISK";
					$scope.OverallRisk_text = "Your risk of developing Type 2 Diabetes is low. Nevertheless, we recommend that you regularly monitor and control the risk of developing the disease because the risk of Type 2 Diabetes increases with age and varies depending on lifestyle. It is important to control your own body weight, to stay physically active and eat healthy. It is also important to let go of bad habits (e.g. alcohol, tobacco).";
				}
				
				
			};
			
          view = view || title + " Content View";
          if(st<Object.keys(data).length){
		  if(st ==1){
			if($scope.var_female == 1){
				data[1] = {title: 'Age', content: "AGE", image: "images/age_female.jpg", disabled: false};
			}else{			
				data[1] = {title: 'Age', content: "AGE", image: "images/age_male.jpg", disabled: false};
			}
		  }
			tabs.push(data[st]);
			data[st].disabled = true;
			st++;
          }
		  	
         };

		 
		 <!-- print -->
		 
		 $scope.printDiv = function(divName) {
  var printContents = document.getElementById(divName).innerHTML;
  var popupWin = window.open('', '_blank', 'width=300,height=300');
  popupWin.document.open();
  popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="../css/style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
  popupWin.document.close();
} 


		 <!--         more          -->

        $scope.IsVisible = false;
        $scope.ShowHide = function () {
                //If DIV is visible it will be hidden and vice versa.
			$scope.IsVisible = $scope.IsVisible ? false : true;
        }
		
		
		<!-- first row -->
		$scope.firstRow = function (Answers) {
		  if (Answers == "Question" || Answers =="Answer") {
			return {'font-weight': 'bold', 'background-color':'Lavender' }
		  }
		}
     }
         
         /**
          * You must include the dependency on 'ngMaterial' 
          */
         var app = angular.module('BlankApp', ['ngMaterial']);
         app.controller('AppCtrl', AppCtrl);
         
         /* display for more informations */
         it('should check ngShow', function() {
         var checkbox = element(by.model('checked'));
         var checkElem = element(by.css('.check-element'));
         
         expect(checkElem.isDisplayed()).toBe(false);
         checkbox.click();
         expect(checkElem.isDisplayed()).toBe(true);
         });
         
         
         /* FOR AGE SLIDER*/
         
         angular.module('sliderDemo1', ['ngMaterial'])
         .config(function($mdIconProvider) {
         $mdIconProvider
          .iconSet('device', 'img/icons/sets/device-icons.svg', 24);
         })
         .controller('AppCtrl', function($scope) {
         
         $scope.color = {
         red: Math.floor(Math.random() * 255),
         green: Math.floor(Math.random() * 255),
         blue: Math.floor(Math.random() * 255)
         };
         
         $scope.rating1 = 3;
         $scope.rating2 = 2;
         $scope.rating3 = 4;
         
         $scope.disabled1 = Math.floor(Math.random() * 100);
         $scope.disabled2 = 0;
         $scope.disabled3 = 70;
         
         $scope.invert = Math.floor(Math.random() * 100);
         
         $scope.isDisabled = true;
         
         
         });
         
         /* switch between divs*/
         
         function izvedi(value){
		 
			 switch(st) {
			 case 0:
				var x = document.getElementById('id_0');
				var y = document.getElementById('id_1');
				break;
			 case 1:
				/* spol */
				var x = document.getElementById('id_1');
				var y = document.getElementById('id_2');
				break;
			 case 2:
				/* starost */
				var x = document.getElementById('id_2');
				var y = document.getElementById('id_3');
				break;	
			 case 3:
				/* obseg pasu */	
				var x = document.getElementById('id_3');
				var y = document.getElementById('id_4');
				break;
			 case 4:	
               <!--  Telesna aktivnost  -->	

				var x = document.getElementById('id_4');
				var y = document.getElementById('id_5');
				break;
			 case 5:
               <!--  Zgodovina povi�anega krvnega sladkorja  -->	

				var x = document.getElementById('id_5');
				var y = document.getElementById('id_6');
				break;
			 case 6:	
               <!--  Zdravila za povi�an krvni tlak  -->	

				var x = document.getElementById('id_6');
				var y = document.getElementById('id_7');
				break;
			 case 7:
               <!--  Diabetes v dru�ini  -->
				var x = document.getElementById('id_7');
				var y = document.getElementById('id_8');
				break;					
			 
			 default:
				var x = document.getElementById('id_8');

			 }
			 
			 x.style.display = 'none';
			 y.style.display = 'block';
         } 