import { DatabaseInfo } from '../types';

export const DATA_MODEL_SCHEMA: DatabaseInfo[] = [
  {
    name: 'Oncoclinical',
    tables: [
      { 
        name: 'antineoplasic_therapy', 
        description: 'Information about cancer treatments and therapies.',
        columns: [
          { name: 'therapy_id', type: 'numeric(38,0)', isPK: true, isFK: false, description: 'Unique identifier for the therapy session' },
          { name: 'patient_id', type: 'numeric(38,0)', isPK: false, isFK: true, description: 'Reference to patient demographics' },
          { name: 'drug_name', type: 'varchar(255)', isPK: false, isFK: false, description: 'Name of the administered drug' },
          { name: 'start_date', type: 'datetime', isPK: false, isFK: false, description: 'Start date of the regimen' },
          { name: 'cycle_number', type: 'int', isPK: false, isFK: false, description: 'Current treatment cycle' }
        ]
      },
      { 
        name: 'demographics', 
        description: 'Patient demographic information (age, sex, etc).',
        columns: [
          { name: 'patient_id', type: 'numeric(38,0)', isPK: true, isFK: false, description: 'Unique identifier for the patient' },
          { name: 'birth_date', type: 'date', isPK: false, isFK: false, description: 'Date of birth' },
          { name: 'gender', type: 'varchar(10)', isPK: false, isFK: false, description: 'Biological sex' },
          { name: 'ethnicity', type: 'varchar(50)', isPK: false, isFK: false, description: 'Patient ethnicity' }
        ]
      },
      { name: 'biopsies_cognos_imported', columns: [], description: 'Imported biopsy data from Cognos systems.' },
      { name: 'committee', columns: [], description: 'Tumor board and committee decisions.' },
      { name: 'first_progression', columns: [], description: 'Data regarding the first clinical progression of the disease.' },
      { name: 'met_biopsies_sap_vh', columns: [], description: 'Metastatic biopsy records from SAP VH.' },
      { name: 'molecular_information', columns: [], description: 'Patient-level molecular and genetic summaries.' },
      { name: 'previous_tumors', columns: [], description: 'History of previous oncological events.' },
      { name: 'project_information', columns: [], description: 'Research project assignments and metadata.' },
      { name: 'surgery', columns: [], description: 'Surgical intervention details.' },
      { name: 'survival', columns: [], description: 'Survival and follow-up data.' },
      { name: 'tumor_baseline', columns: [], description: 'Baseline tumor characteristics at diagnosis.' },
    ]
  },
  {
    name: 'OncoPharma',
    tables: [
      { 
        name: 'DrugInformation', 
        description: 'Pharmacological details of drugs.',
        columns: [
          { name: 'drug_code', type: 'varchar(50)', isPK: true, isFK: false, description: 'Standard pharmaceutical code' },
          { name: 'brand_name', type: 'varchar(255)', isPK: false, isFK: false, description: 'Commercial brand name' },
          { name: 'atc_code', type: 'varchar(20)', isPK: false, isFK: false, description: 'Anatomical Therapeutic Chemical classification' }
        ]
      },
      { name: 'FilesProcessed', columns: [], description: 'Log of processed pharmacy files.' },
      { name: 'HemOncConcepts', columns: [], description: 'Standardized oncology concepts.' },
      { name: 'HemOncRegimenComponents', columns: [], description: 'Components of treatment regimens.' },
      { name: 'HemOncRegimensConditions', columns: [], description: 'Conditions associated with regimens.' },
      { name: 'HemOncRelationships', columns: [], description: 'Entity relationships in HemOnc.' },
      { name: 'Treatments_Intravenous', columns: [], description: 'IV treatment records.' },
      { name: 'Treatments_Oral', columns: [], description: 'Oral medication records.' },
      { name: 'ttmSchemeMapping', columns: [], description: 'Mapping of treatment schemes.' },
      { name: 'ttmSchemeMappingAgent', columns: [], description: 'Agent mappings for schemes.' },
      { name: 'ttmSchemePrecurated', columns: [], description: 'Pre-curated treatment schemes.' },
    ]
  },
  {
    name: 'ClinicalTrials',
    tables: [
      { 
        name: 'trials', 
        description: 'General trial metadata.',
        columns: [
          { name: 'nct_id', type: 'varchar(20)', isPK: true, isFK: false, description: 'ClinicalTrials.gov identifier' },
          { name: 'trial_phase', type: 'varchar(10)', isPK: false, isFK: false, description: 'Phase of the clinical trial' },
          { name: 'enrollment_target', type: 'int', isPK: false, isFK: false, description: 'Planned number of participants' }
        ]
      },
      { name: 'CuratedKeyIncExcCriteria', columns: [], description: 'Curated inclusion/exclusion criteria.' },
      { name: 'fishAlteration', columns: [], description: 'FISH molecular alteration data.' },
      { name: 'geneCopyNumberAlteration', columns: [], description: 'CNA results by gene.' },
      { name: 'geneFusion', columns: [], description: 'Gene fusion events detected.' },
      { name: 'geneMutation', columns: [], description: 'Point mutations and small indels.' },
      { name: 'MatchAlert', columns: [], description: 'Trial matching alerts for patients.' },
      { name: 'mutationalSignature', columns: [], description: 'Mutational signature proportions.' },
      { name: 'mutationalSignatureOpValue', columns: [], description: 'Operating values for signatures.' },
      { name: 'PhaseValidation', columns: [], description: 'Trial phase validation markers.' },
      { name: 'proteinMarker', columns: [], description: 'IHC and other protein markers.' },
      { name: 'RecStatusValidation', columns: [], description: 'Recruitment status validation.' },
      { name: 'TrialInclusions', columns: [], description: 'Records of patient inclusions in trials.' },
      { name: 'tumor', columns: [], description: 'Tumor characteristics within the trial context.' },
    ]
  },
  {
    name: 'Prescreening',
    tables: [
      { 
        name: 'Clinical_information', 
        description: 'Core clinical profile for prescreening cohorts.',
        columns: [
          { name: 'Patient_id', type: 'numeric(38,0)', isPK: true, isFK: false, description: 'Identificador único del paciente' },
          { name: 'SAP', type: 'varchar(25)', isPK: false, isFK: false, description: 'Código SAP del paciente' },
          { name: 'Gender', type: 'varchar(255)', isPK: false, isFK: true, description: 'Género del paciente' },
          { name: 'Primary_race', type: 'varchar(255)', isPK: false, isFK: true, description: 'Raza principal del paciente' }
        ]
      },
      { 
        name: 'Panel_300', 
        description: 'Results from the 300-gene panel.',
        columns: [
          { name: 'result_id', type: 'numeric(38,0)', isPK: true, isFK: false, description: 'Unique result identifier' },
          { name: 'gene_symbol', type: 'varchar(50)', isPK: false, isFK: false, description: 'Official HUGO gene symbol' },
          { name: 'variant_type', type: 'varchar(50)', isPK: false, isFK: false, description: 'Type of variant (SNV, Indel, etc)' }
        ]
      },
      { name: 'Biopsies', columns: [], description: 'Primary and metastatic biopsy details.' },
      { name: 'Clinical_notes', columns: [], description: 'Unstructured clinical documentation.' },
      { name: 'Clinical_notes_historic', columns: [], description: 'Archived historical clinical notes.' },
      { name: 'Images', columns: [], description: 'References to radiological or pathology imaging.' },
      { name: 'Informed_consents', columns: [], description: 'Patient consent status for research.' },
      { name: 'md_ColumnDescription', columns: [], description: 'Metadata for all columns in the DB.' },
      { name: 'MultireportManager', columns: [], description: 'Management of multi-test reports.' },
      { name: 'Panel_300_backup_05_11_2024', columns: [], description: 'Backup of the 300-gene panel.' },
      { name: 'Panel_300_excel', columns: [], description: 'Excel-sourced 300-gene panel data.' },
      { name: 'Panel_300_from_reports', columns: [], description: 'Report-extracted 300-gene panel data.' },
      { name: 'Panel_Amplicon', columns: [], description: 'Results from amplicon-based NGS panels.' },
      { name: 'Panel_CopyNumber', columns: [], description: 'CNA results from NGS panels.' },
      { name: 'Panel_Epsilon', columns: [], description: 'Results from the Epsilon panel.' },
      { name: 'Panel_Fish', columns: [], description: 'NGS-derived FISH-like insights.' },
      { name: 'Panel_Fusion', columns: [], description: 'Fusion results from gene panels.' },
      { name: 'Panel_Guardant', columns: [], description: 'Guardant liquid biopsy results.' },
      { name: 'Panel_Guardant_BuffyCoat', columns: [], description: 'Buffy coat controls for Guardant tests.' },
      { name: 'Panel_Guardant_excel', columns: [], description: 'Excel-sourced Guardant data.' },
      { name: 'Panel_Guardant_from_reports', columns: [], description: 'Report-extracted Guardant data.' },
      { name: 'Panel_HE', columns: [], description: 'Hematology-Oncology panel results.' },
      { name: 'Panel_IHC', columns: [], description: 'Immunohistochemistry results.' },
      { name: 'Panel_MSI', columns: [], description: 'Microsatellite instability status.' },
      { name: 'Panel_RAD51', columns: [], description: 'RAD51 functional assay results.' },
    ]
  },
];
