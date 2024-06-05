import { Component, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CommunityService } from 'src/app/@shared/services/community.service';
import { CustomerService } from 'src/app/@shared/services/customer.service';
import { SeoService } from 'src/app/@shared/services/seo.service';
import { ToastService } from 'src/app/@shared/services/toast.service';
import { TokenStorageService } from 'src/app/@shared/services/token-storage.service';

@Component({
  selector: 'app-healing-practitioner-registration',
  templateUrl: './healing-practitioner-registration.component.html',
  styleUrls: ['./healing-practitioner-registration.component.scss'],
})
export class HealingPractitionerRegistrationComponent implements OnInit {
  profileId: number;

  allCountryData: any;
  selectedCountry = 'US';
  allStateData: any;
  selectedState = '';

  isCountryChecked: boolean = true;
  isWorldwideChecked: boolean = false;

  selectPractitionerPage: boolean;

  practitionerArea: any = [];
  selectedAreaValues: number[] = [];

  selectedCards: any[] = [];
  medicalSpecialties: any[] = [
    {
      id: 1,
      title: 'Allergists/Immunologists',
      details: [
        'Allergy testing',
        'Managing allergy treatment',
        'Diagnosing and treating asthma',
        'Diagnosing and treating immune deficiency disorders'
      ]
    },
    {
      id: 2,
      title: 'Cardiologists',
      details: [
        'Cardiac catheterization',
        'Pacemaker placement',
        'Arrhythmia ablation'
      ]
    },
    {
      id: 3,
      title: 'Dermatologists',
      description: 'Dermatology specialists focus on skin, hair, and nails.'
    },
    {
      id: 4,
      title: 'Endocrinologists',
      details: [
        'Diabetes',
        'Thyroid problems',
        'Growth disorders',
        'Adrenal gland disorders'
      ]
    },
    {
      id: 5,
      title: 'Gastroenterologists',
      details: [
        'Esophagus',
        'Stomach',
        'Intestines',
        'Liver',
        'Gallbladder',
        'Pancreas'
      ]
    },
    {
      id: 6,
      title: 'Geriatrician',
      description: 'Geriatric medicine specialists focus on the care for senior citizens and amazing mature humans!'
    },
    {
      id: 7,
      title: 'Hematologist-oncologist',
      description: 'Hematology-oncology specialists diagnose and treat blood disorders and many different types of blood cancers.'
    },
    {
      id: 8,
      title: 'Infectious disease',
      details: [
        'HIV/AIDS',
        'Tuberculosis',
        'Lyme disease',
        'Complex infections in people with weakened immune systems'
      ]
    },
    {
      id: 9,
      title: 'Nephrologists',
      description: 'Nephrology specialists focus on diagnosing and treating problems related to kidney function.'
    },
    {
      id: 10,
      title: 'Neurologist',
      details: [
        'Dementia',
        'Stroke',
        'Migraines',
        'Multiple sclerosis',
        'Seizures'
      ]
    },
    {
      id: 11,
      title: 'Oncologist',
      description: 'Oncology specialists care for people with cancer.'
    },
    {
      id: 12,
      title: 'Palliative care doctor',
      description: 'Palliative care specialists focus on increasing comfort and the quality of life for people with illness at any stage of disease.'
    },
    {
      id: 13,
      title: 'Physiatrist',
      description: 'Physical medicine and rehabilitation specialists are known as physiatrists. These doctors help treat problems of the brain, spinal cord, as well as muscles and bones.'
    },
    {
      id: 14,
      title: 'Psychiatrist',
      description: 'Psychiatrists are medical specialists who focus on mental health.'
    },
    {
      id: 15,
      title: 'Pulmonologist',
      details: [
        'Bronchoscopy',
        'Spirometry',
        'Airway stent placement'
      ]
    },
    {
      id: 16,
      title: 'Rheumatologist',
      details: [
        'Joints',
        'Bones',
        'Muscles',
        'Tendons',
        'Ligaments'
      ]
    },
    {
      id: 17,
      title: 'Pediatrician',
      description: 'Pediatricians specialize in children’s medicine.'
    }
  ];

  surgicalSpecialties: any[] = [
    {
      id: 18,
      title: 'General surgeon',
      description: 'General surgeons treat a wide variety of problems that involve organs of the abdomen, the skin and soft tissues, breast, neck, and other areas.',
      details: [
        'Trauma surgery',
        'Breast surgery',
        'Cancer surgery',
        'Critical care surgery'
      ]
    },
    {
      id: 19,
      title: 'Colorectal surgeon',
      description: 'Colorectal surgeons specialize in treating diseases of the:',
      details: [
        'Intestinal tract',
        'Colon',
        'Rectum',
        'Anal canal',
        'Perianal area'
      ]
    },
    {
      id: 20,
      title: 'Pediatric surgeon',
      description: 'Pediatric surgeons treat diseases that need surgery in children.'
    },
    {
      id: 21,
      title: 'Plastic surgeon',
      details: [
        'Breast reconstruction after breast cancer surgery',
        'Cleft lip and palate repair',
        'Hand surgery',
        'Surgeries to treat scars'
      ]
    },
    {
      id: 22,
      title: 'Orthopedic surgeon',
      description: 'Orthopedic surgeons specialize in managing problems of the bones, muscles, ligaments, and tendons in the body.'
    },
    {
      id: 23,
      title: 'Otolaryngologist',
      description: 'Otolaryngologists (ENT) are surgeons who treat medical problems of the head and neck.'
    },
    {
      id: 24,
      title: 'Oral and maxillofacial surgeon',
      description: 'Oral and maxillofacial surgeons (OMFS) focus on surgery of the head, neck, face, mouth, and jaw.'
    },
    {
      id: 25,
      title: 'Neurosurgeon',
      description: 'Neurosurgeons perform surgery on the brain and spinal cord to help treat neurologic diseases.',
      details: [
        'Brain tumors',
        'Seizures',
        'Brain aneurysms',
        'Spinal cord problems'
      ]
    },
    {
      id: 26,
      title: 'Thoracic surgeon',
      description: 'Thoracic surgeons perform surgery on the organs in the chest.',
      details: [
        'Heart disease',
        'Emphysema',
        'Lung cancer',
        'Problems of the large blood vessels in the chest',
        'Esophageal cancer'
      ]
    },
    {
      id: 27,
      title: 'Vascular surgeon',
      description: 'Vascular surgeons treat diseases of the blood vessels in your body, except those in the brain and heart.'
    },
    {
      id: 28,
      title: 'Obstetrician-gynecologist',
      description: 'Obstetrician-gynecologists (OB-GYN) specialize in care for those assigned female at birth.',
      details: [
        'High-risk pregnancies',
        'Fertility problems',
        'Gynecologic cancers'
      ]
    },
    {
      id: 29,
      title: 'Urologist',
      description: 'Urologists diagnose and treat medical and surgical problems of the urinary tract.',
      details: [
        'Kidney',
        'Ureter',
        'Bladder',
        'Adrenal glands'
      ]
    },
    {
      id: 30,
      title: 'Ophthalmologist',
      description: 'Ophthalmologists are the “eye doctors.” These specialists diagnose and treat medical and surgical problems of the eyes.'
    },
    {
      id: 31,
      title: 'Anesthesiologist',
      description: 'Anesthesiologists care for people who need sedation for surgery and other types of medical procedures.'
    },
    {
      id: 32,
      title: 'Radiologist',
      description: 'Radiologists are doctors who specialize in performing and interpreting medical imaging.',
      details: [
        'Stent placement'
      ]
    }
  ];

  isFromHome = false;

  constructor(
    private seoService: SeoService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private tokenStorage: TokenStorageService,
    private toastService: ToastService,
    private communityService: CommunityService,
  ) {
    const queryParams = this.route.snapshot.queryParams;
    const newParams = { ...queryParams };
    // console.log(this.router.routerState.snapshot.url);
    this.selectPractitionerPage = this.router.routerState.snapshot.url.includes('request-video-call') || false;
    this.isFromHome = this.router.routerState.snapshot.url.includes('request-video-call') || false;
    // console.log(this.selectPractitionerPage)
    // this.channelId = this.shareService?.channelData?.id;
    // this.route.queryParams.subscribe((params: any) => {
    //   console.log(params.channelId);
    if (newParams['token']) {
      const token = newParams['token'];
      this.tokenStorage.saveToken(token)
      delete newParams['token']
      const navigationExtras: NavigationExtras = {
        queryParams: newParams
      };
      this.router.navigate([], navigationExtras);
    }

    this.profileId = Number(localStorage.getItem('profileId'));
    const data = {
      title: 'MedicalTalk Registration',
      url: `${window.window.location.href}`,
      description: '',
    };
    this.seoService.updateSeoMetaData(data);
  }

  ngOnInit(): void {
    this.getAllCountries();
    this.getCategories();
  }

  updateCheckbox(selectedOption: 'country' | 'worldwide') {
    if (selectedOption === 'country' && this.isWorldwideChecked) {
      this.isWorldwideChecked = false;
    } else if (selectedOption === 'worldwide' && this.isCountryChecked) {
      this.selectedCountry = '';
      this.selectedState = '';
      this.allStateData = null
      this.isCountryChecked = false;
    }
  }

  getAllCountries() {
    this.spinner.show();
    this.customerService.getCountriesData().subscribe({
      next: (result) => {
        this.spinner.hide();
        this.allCountryData = result;
        this.getAllState();
      },
      error: (error) => {
        this.spinner.hide();
        console.log(error);
      },
    });
  }

  getAllState() {
    this.spinner.show();
    const selectCountry = this.selectedCountry;
    this.customerService.getStateData(selectCountry).subscribe({
      next: (result) => {
        this.spinner.hide();
        this.allStateData = result;
      },
      error: (error) => {
        this.spinner.hide();
        console.log(error);
      },
    });
  }
  isSelected(id: number): boolean {
    return this.selectedCards.includes(id);
  }

  selectCard(cardId: string): void {
    const index = this.selectedCards.indexOf(cardId);
    if (index === -1) {
      this.selectedCards = [];
      this.selectedCards.push(cardId);
    } else {
      this.selectedCards = this.selectedCards.filter(id => id !== cardId);
    }
  }

  changeCountry() {
    if (this.isCountryChecked) {
      this.getAllState();
    }
  }

  backPreview() {
    this.selectPractitionerPage = !this.selectPractitionerPage;
  }

  nextPageSearch() {
    if (this.selectedCards.length > 0) {
      const practitionerRequirements = {
        selectedCard: this.selectedCards,
        selectedCountry: this.selectedCountry,
        selectedState: this.selectedState,
        selectedAreas: this.selectedAreaValues
      };
      this.router.navigate(['/doctors'], { state: { data: practitionerRequirements } });
    } else if (this.isWorldwideChecked && this.selectedCards.length <= 0) {
      const areaValues = { selectedAreas: this.selectedAreaValues } 
      this.router.navigate(['/doctors'], { state: { data: areaValues } });
    }
    else {
      this.toastService.danger('Please select What emphasis are you interested in healing');
    }
  }

  getCategories() {
    this.communityService.getCategories().subscribe({
      next: (res) => {
        this.practitionerArea = res.area;
        // this.cards = res.emphasis;
      },
      error: (error) => {
        this.spinner.hide();
        console.log(error);
      },
    });
  }

  onAreaboxChange(event: any, area: any): void {
    const isChecked = event.target.checked;
    if (isChecked) {
      this.selectedAreaValues.push(area.aId);
    } else {
      this.selectedAreaValues = this.selectedAreaValues.filter(
        (id) => id !== area.aId
      );
    }
  }
}
