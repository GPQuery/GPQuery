/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import sqldb from '../sqldb';
import config from './environment/';

export default function seedDatabaseIfNeeded() {
  if(1 === 0) {
    let Country = sqldb.Country;

    return Country.destroy({ where: {} })
      .then(() => {
        let country = Country.bulkCreate([{
          name: 'Afghanistan',
          demonym: 'Afghan',
          iso2: 'af'
        }, {
          name: 'Albania',
          demonym: 'Albanian',
          iso2: 'al'
        }, {
          name: 'Antarctica',
          demonym: 'Antartican',
          iso2: 'aq'
        }, {
          name: 'Algeria',
          demonym: 'Algerian',
          iso2: 'dz'
        }, {
          name: 'American Samoa',
          demonym: 'Samoan',
          iso2: 'as'
        }, {
          name: 'Andorra',
          demonym: 'Andorran',
          iso2: 'ad'
        }, {
          name: 'Angola',
          demonym: 'Angolan',
          iso2: 'ao'
        }, {
          name: 'Antigua and Barbuda',
          demonym: 'Antiguan and Barbudan',
          iso2: 'ag'
        }, {
          name: 'Azerbaijan',
          demonym: 'Azerbaijani',
          iso2: 'az'
        }, {
          name: 'Argentina',
          demonym: 'Argentine',
          iso2: 'ar'
        }, {
          name: 'Australia',
          demonym: 'Australian',
          iso2: 'au'
        }, {
          name: 'Austria',
          demonym: 'Austrian',
          iso2: 'at'
        }, {
          name: 'Bahamas',
          demonym: 'Bahamian',
          iso2: 'bs'
        }, {
          name: 'Bahrain',
          demonym: 'Bahraini',
          iso2: 'bh'
        }, {
          name: 'Bangladesh',
          demonym: 'Bangladeshi',
          iso2: 'bd'
        }, {
          name: 'Armenia',
          demonym: 'Armenian',
          iso2: 'am'
        }, {
          name: 'Barbados',
          demonym: 'Barbadian',
          iso2: 'bb'
        }, {
          name: 'Belgium',
          demonym: 'Belgian',
          iso2: 'be'
        }, {
          name: 'Bermuda',
          demonym: 'Bermudian',
          iso2: 'bm'
        }, {
          name: 'Bhutan',
          demonym: 'Bhutanese',
          iso2: 'bt'
        }, {
          name: 'Bolivia',
          demonym: 'Bolivian',
          iso2: 'bo'
        }, {
          name: 'Bosnia and Herzegovina',
          demonym: 'Bosnian',
          iso2: 'ba'
        }, {
          name: 'Botswana',
          demonym: 'Botswanan',
          iso2: 'bw'
        }, {
          name: 'Bouvet Island',
          demonym: 'of Bouvet island',
          iso2: 'bv'
        }, {
          name: 'Brazil',
          demonym: 'Brazilian',
          iso2: 'br'
        }, {
          name: 'Belize',
          demonym: 'Belizean',
          iso2: 'bz'
        }, {
          name: 'British Indian Ocean Territory',
          demonym: 'Changosian',
          iso2: 'io'
        }, {
          name: 'Solomon Islands',
          demonym: 'Solomon Islander',
          iso2: 'sb'
        }, {
          name: 'Virgin Islands (British)',
          demonym: 'British Virgin Islander',
          iso2: 'vg'
        }, {
          name: 'Brunei Darussalam',
          demonym: 'Bruneian',
          iso2: 'bn'
        }, {
          name: 'Bulgaria',
          demonym: 'Bulgarian',
          iso2: 'bg'
        }, {
          name: 'Myanmar',
          demonym: 'Burmese',
          iso2: 'mm'
        }, {
          name: 'Burundi',
          demonym: 'Burundian',
          iso2: 'bi'
        }, {
          name: 'Belarus',
          demonym: 'Belarusian',
          iso2: 'by'
        }, {
          name: 'Cambodia',
          demonym: 'Cambodian',
          iso2: 'kh'
        }, {
          name: 'Cameroon',
          demonym: 'Cameroonian',
          iso2: 'cm'
        }, {
          name: 'Canada',
          demonym: 'Canadian',
          iso2: 'ca'
        }, {
          name: 'Cape Verde',
          demonym: 'Cape Verdean',
          iso2: 'cv'
        }, {
          name: 'Cayman Islands',
          demonym: 'Caymanian',
          iso2: 'ky'
        }, {
          name: 'Central African Republic',
          demonym: 'Central African',
          iso2: 'cf'
        }, {
          name: 'Sri Lanka',
          demonym: 'Sri Lankan',
          iso2: 'lk'
        }, {
          name: 'Chad',
          demonym: 'Chadian',
          iso2: 'td'
        }, {
          name: 'Chile',
          demonym: 'Chilean',
          iso2: 'cl'
        }, {
          name: 'China',
          demonym: 'Chinese',
          iso2: 'cn'
        }, {
          name: 'Taiwan',
          demonym: 'Taiwanese',
          iso2: 'tw'
        }, {
          name: 'Christmas Island',
          demonym: 'Christmas Islander',
          iso2: 'cx'
        }, {
          name: 'Cocos Islands',
          demonym: 'Cocos Islander',
          iso2: 'cc'
        }, {
          name: 'Colombia',
          demonym: 'Colombian',
          iso2: 'co'
        }, {
          name: 'Comoros',
          demonym: 'Comorian',
          iso2: 'km'
        }, {
          name: 'Mayotte',
          demonym: 'Mahorais',
          iso2: 'yt'
        }, {
          name: 'Congo',
          demonym: 'Congolese',
          iso2: 'cg'
        }, {
          name: 'Congo, the Democratic Republic of the',
          demonym: 'Congolese',
          iso2: 'cd'
        }, {
          name: 'Cook Islands',
          demonym: 'Cook Islander',
          iso2: 'ck'
        }, {
          name: 'Costa Rica',
          demonym: 'Costa Rican',
          iso2: 'cr'
        }, {
          name: 'Croatia',
          demonym: 'Croatian',
          iso2: 'hr'
        }, {
          name: 'Cuba',
          demonym: 'Cuban',
          iso2: 'cu'
        }, {
          name: 'Cyprus',
          demonym: 'Cypriot',
          iso2: 'cy'
        }, {
          name: 'Czech Republic',
          demonym: 'Czech',
          iso2: 'cz'
        }, {
          name: 'Benin',
          demonym: 'Beninese',
          iso2: 'bj'
        }, {
          name: 'Denmark',
          demonym: 'Danish',
          iso2: 'dk'
        }, {
          name: 'Dominica',
          demonym: 'Dominican',
          iso2: 'dm'
        }, {
          name: 'Dominican Republic',
          demonym: 'Dominican',
          iso2: 'do'
        }, {
          name: 'Ecuador',
          demonym: 'Ecuadorian',
          iso2: 'ec'
        }, {
          name: 'El Salvador',
          demonym: 'Salvadoran',
          iso2: 'sv'
        }, {
          name: 'Equatorial Guinea',
          demonym: 'Equatorial Guinean',
          iso2: 'gq'
        }, {
          name: 'Ethiopia',
          demonym: 'Ethiopian',
          iso2: 'et'
        }, {
          name: 'Eritrea',
          demonym: 'Eritrean',
          iso2: 'er'
        }, {
          name: 'Estonia',
          demonym: 'Estonian',
          iso2: 'ee'
        }, {
          name: 'Faroe Islands',
          demonym: 'Faeroese',
          iso2: 'fo'
        }, {
          name: 'Falkland Islands',
          demonym: 'Falkland Islander',
          iso2: 'fk'
        }, {
          name: 'South Georgia and the South Sandwich Islands',
          demonym: 'of South Georgia and the South Sandwich Islands',
          iso2: 'gs'
        }, {
          name: 'Fiji',
          demonym: 'Fijian',
          iso2: 'fj'
        }, {
          name: 'Finland',
          demonym: 'Finnish',
          iso2: 'fi'
        }, {
          name: 'Åland Islands',
          demonym: 'Åland Islander',
          iso2: 'ax'
        }, {
          name: 'France',
          demonym: 'French',
          iso2: 'fr'
        }, {
          name: 'French Guiana',
          demonym: 'Guianese',
          iso2: 'gf'
        }, {
          name: 'French Polynesia',
          demonym: 'Polynesian',
          iso2: 'pf'
        }, {
          name: 'French Southern Territories',
          demonym: 'of French Southern and Antarctic Lands',
          iso2: 'tf'
        }, {
          name: 'Djibouti',
          demonym: 'Djiboutian',
          iso2: 'dj'
        }, {
          name: 'Gabon',
          demonym: 'Gabonese',
          iso2: 'ga'
        }, {
          name: 'Georgia',
          demonym: 'Georgian',
          iso2: 'ge'
        }, {
          name: 'Gambia',
          demonym: 'Gambian',
          iso2: 'gm'
        }, {
          name: 'East Germany',
          demonym: 'East German',
          iso2: 'dd'
        }, {
          name: 'Germany',
          demonym: 'German',
          iso2: 'de'
        }, {
          name: 'Ghana',
          demonym: 'Ghanaian',
          iso2: 'gh'
        }, {
          name: 'Gibraltar',
          demonym: 'Gibraltarian',
          iso2: 'gi'
        }, {
          name: 'Kiribati',
          demonym: 'Kiribatian',
          iso2: 'ki'
        }, {
          name: 'Greece',
          demonym: 'Greek',
          iso2: 'gr'
        }, {
          name: 'Greenland',
          demonym: 'Greenlander',
          iso2: 'gl'
        }, {
          name: 'Grenada',
          demonym: 'Grenadian',
          iso2: 'gd'
        }, {
          name: 'Guadeloupe',
          demonym: 'Guadeloupean',
          iso2: 'gp'
        }, {
          name: 'Guam',
          demonym: 'Guamanian',
          iso2: 'gu'
        }, {
          name: 'Guatemala',
          demonym: 'Guatemalan',
          iso2: 'gt'
        }, {
          name: 'Guinea',
          demonym: 'Guinean',
          iso2: 'gn'
        }, {
          name: 'Guyana',
          demonym: 'Guyanese',
          iso2: 'gy'
        }, {
          name: 'Haiti',
          demonym: 'Haitian',
          iso2: 'ht'
        }, {
          name: 'Heard Island and McDonald Islands',
          demonym: 'of Territory of Heard Island and McDonald Islands',
          iso2: 'hm'
        }, {
          name: 'Holy See',
          demonym: 'of the Vatican',
          iso2: 'va'
        }, {
          name: 'Honduras',
          demonym: 'Honduran',
          iso2: 'hn'
        }, {
          name: 'Hong Kong',
          demonym: 'Hong Kong Chinese',
          iso2: 'hk'
        }, {
          name: 'Hungary',
          demonym: 'Hungarian',
          iso2: 'hu'
        }, {
          name: 'Iceland',
          demonym: 'Icelander',
          iso2: 'is'
        }, {
          name: 'India',
          demonym: 'Indian',
          iso2: 'in'
        }, {
          name: 'Indonesia',
          demonym: 'Indonesian',
          iso2: 'id'
        }, {
          name: 'Iran',
          demonym: 'Iranian',
          iso2: 'ir'
        }, {
          name: 'Iraq',
          demonym: 'Iraqi',
          iso2: 'iq'
        }, {
          name: 'Ireland',
          demonym: 'Irish',
          iso2: 'ie'
        }, {
          name: 'Israel',
          demonym: 'Israeli',
          iso2: 'il'
        }, {
          name: 'Italy',
          demonym: 'Italian',
          iso2: 'it'
        }, {
          name: 'Ivory Coast',
          demonym: 'Ivorian',
          iso2: 'ci'
        }, {
          name: 'Jamaica',
          demonym: 'Jamaican',
          iso2: 'jm'
        }, {
          name: 'Japan',
          demonym: 'Japanese',
          iso2: 'jp'
        }, {
          name: 'Kazakhstan',
          demonym: 'Kazakh',
          iso2: 'kz'
        }, {
          name: 'Jordan',
          demonym: 'Jordanian',
          iso2: 'jo'
        }, {
          name: 'Kenya',
          demonym: 'Kenyan',
          iso2: 'ke'
        }, {
          name: 'North Korea',
          demonym: 'North Korean',
          iso2: 'kp'
        }, {
          name: 'South Korea',
          demonym: 'South Korean',
          iso2: 'kr'
        }, {
          name: 'Korea',
          demonym: 'Korean',
          iso2: 'kr'
        }, {
          name: 'Kuwait',
          demonym: 'Kuwaiti',
          iso2: 'kw'
        }, {
          name: 'Kyrgyzstan',
          demonym: 'Kyrgyz',
          iso2: 'kg'
        }, {
          name: 'Lao',
          demonym: 'Lao',
          iso2: 'la'
        }, {
          name: 'Lebanon',
          demonym: 'Lebanese',
          iso2: 'lb'
        }, {
          name: 'Lesotho',
          demonym: 'Basotho',
          iso2: 'ls'
        }, {
          name: 'Latvia',
          demonym: 'Latvian',
          iso2: 'lv'
        }, {
          name: 'Liberia',
          demonym: 'Liberian',
          iso2: 'lr'
        }, {
          name: 'Libya',
          demonym: 'Libyan',
          iso2: 'ly'
        }, {
          name: 'Liechtenstein',
          demonym: 'Liechtensteiner',
          iso2: 'li'
        }, {
          name: 'Lithuania',
          demonym: 'Lithuanian',
          iso2: 'lt'
        }, {
          name: 'Luxembourg',
          demonym: 'Luxembourger',
          iso2: 'lu'
        }, {
          name: 'Macao',
          demonym: 'Macanese',
          iso2: 'mo'
        }, {
          name: 'Madagascar',
          demonym: 'Malagasy',
          iso2: 'mg'
        }, {
          name: 'Malawi',
          demonym: 'Malawian',
          iso2: 'mw'
        }, {
          name: 'Malaysia',
          demonym: 'Malaysian',
          iso2: 'my'
        }, {
          name: 'Maldives',
          demonym: 'Maldivian',
          iso2: 'mv'
        }, {
          name: 'Mali',
          demonym: 'Malian',
          iso2: 'ml'
        }, {
          name: 'Malta',
          demonym: 'Maltese',
          iso2: 'mt'
        }, {
          name: 'Martinique',
          demonym: 'Martinican',
          iso2: 'mq'
        }, {
          name: 'Mauritania',
          demonym: 'Mauritanian',
          iso2: 'mr'
        }, {
          name: 'Mauritius',
          demonym: 'Mauritian',
          iso2: 'mu'
        }, {
          name: 'Mexico',
          demonym: 'Mexican',
          iso2: 'mx'
        }, {
          name: 'Monaco',
          demonym: 'Monegasque',
          iso2: 'mc'
        }, {
          name: 'Mongolia',
          demonym: 'Mongolian',
          iso2: 'mn'
        }, {
          name: 'Moldova',
          demonym: 'Moldovan',
          iso2: 'md'
        }, {
          name: 'Montenegro',
          demonym: 'Montenegrin',
          iso2: 'me'
        }, {
          name: 'Montserrat',
          demonym: 'Montserratian',
          iso2: 'ms'
        }, {
          name: 'Morocco',
          demonym: 'Moroccan',
          iso2: 'ma'
        }, {
          name: 'Mozambique',
          demonym: 'Mozambican',
          iso2: 'mz'
        }, {
          name: 'Oman',
          demonym: 'Omani',
          iso2: 'om'
        }, {
          name: 'Namibia',
          demonym: 'Namibian',
          iso2: 'na'
        }, {
          name: 'Nauru',
          demonym: 'Nauruan',
          iso2: 'nr'
        }, {
          name: 'Nepal',
          demonym: 'Nepalese',
          iso2: 'np'
        }, {
          name: 'Netherlands',
          demonym: 'Dutch',
          iso2: 'nl'
        }, {
          name: 'Curaçao',
          demonym: 'Curaçaoan',
          iso2: 'cw'
        }, {
          name: 'Aruba',
          demonym: 'Aruban',
          iso2: 'aw'
        }, {
          name: 'Sint Maarten',
          demonym: 'Sint Maartener',
          iso2: 'sx'
        }, {
          name: 'Bonaire, Sint Eustatius and Saba',
          demonym: 'of Bonaire, Sint Eustatius and Saba',
          iso2: 'bq'
        }, {
          name: 'New Caledonia',
          demonym: 'New Caledonian',
          iso2: 'nc'
        }, {
          name: 'Vanuatu',
          demonym: 'Vanuatuan',
          iso2: 'vu'
        }, {
          name: 'New Zealand',
          demonym: 'New Zealander',
          iso2: 'nz'
        }, {
          name: 'Nicaragua',
          demonym: 'Nicaraguan',
          iso2: 'ni'
        }, {
          name: 'Niger',
          demonym: 'Nigerien',
          iso2: 'ne'
        }, {
          name: 'Nigeria',
          demonym: 'Nigerian',
          iso2: 'ng'
        }, {
          name: 'Niue',
          demonym: 'Niuean',
          iso2: 'nu'
        }, {
          name: 'Norfolk Island',
          demonym: 'Norfolk Islander',
          iso2: 'nf'
        }, {
          name: 'Norway',
          demonym: 'Norwegian',
          iso2: 'no'
        }, {
          name: 'Northern Mariana Islands',
          demonym: 'Northern Mariana Islander',
          iso2: 'mp'
        }, {
          name: 'United States Minor Outlying Islands',
          demonym: 'of United States Minor Outlying Islands',
          iso2: 'um'
        }, {
          name: 'Micronesia',
          demonym: 'Micronesian',
          iso2: 'fm'
        }, {
          name: 'Marshall Islands',
          demonym: 'Marshallese',
          iso2: 'mh'
        }, {
          name: 'Palau',
          demonym: 'Palauan',
          iso2: 'pw'
        }, {
          name: 'Pakistan',
          demonym: 'Pakistani',
          iso2: 'pk'
        }, {
          name: 'Panama',
          demonym: 'Panamanian',
          iso2: 'pa'
        }, {
          name: 'Papua New Guinea',
          demonym: 'Papua New Guinean',
          iso2: 'pg'
        }, {
          name: 'Paraguay',
          demonym: 'Paraguayan',
          iso2: 'py'
        }, {
          name: 'Peru',
          demonym: 'Peruvian',
          iso2: 'pe'
        }, {
          name: 'Philippines',
          demonym: 'Filipino',
          iso2: 'ph'
        }, {
          name: 'Pitcairn',
          demonym: 'Pitcairner',
          iso2: 'pn'
        }, {
          name: 'Poland',
          demonym: 'Polish',
          iso2: 'pl'
        }, {
          name: 'Portugal',
          demonym: 'Portuguese',
          iso2: 'pt'
        }, {
          name: 'Guinea-Bissau',
          demonym: 'Guinea-Bissau national',
          iso2: 'gw'
        }, {
          name: 'Timor-Leste',
          demonym: 'East Timorese',
          iso2: 'tl'
        }, {
          name: 'Puerto Rico',
          demonym: 'Puerto Rican',
          iso2: 'pr'
        }, {
          name: 'Qatar',
          demonym: 'Qatari',
          iso2: 'qa'
        }, {
          name: 'Réunion',
          demonym: 'Reunionese',
          iso2: 're'
        }, {
          name: 'Romania',
          demonym: 'Romanian',
          iso2: 'ro'
        }, {
          name: 'Russia',
          demonym: 'Russian',
          iso2: 'ru'
        }, {
          name: 'Rwanda',
          demonym: 'Rwandan',
          iso2: 'rw'
        }, {
          name: 'Saint Barthélemy',
          demonym: 'of Saint Barthélemy',
          iso2: 'bl'
        }, {
          name: 'Saint Helena',
          demonym: 'Saint Helenian',
          iso2: 'sh'
        }, {
          name: 'Saint Kitts and Nevis',
          demonym: 'Kittsian and Nevisian',
          iso2: 'kn'
        }, {
          name: 'Anguilla',
          demonym: 'Anguillan',
          iso2: 'ai'
        }, {
          name: 'Saint Lucia',
          demonym: 'Saint Lucian',
          iso2: 'lc'
        }, {
          name: 'Saint Martin',
          demonym: 'of Saint Martin',
          iso2: 'mf'
        }, {
          name: 'Saint Pierre and Miquelon',
          demonym: 'St-Pierrais and Miquelonnais',
          iso2: 'pm'
        }, {
          name: 'Saint Vincent and the Grenadines',
          demonym: 'Vincentian',
          iso2: 'vc'
        }, {
          name: 'San Marino',
          demonym: 'San Marinese',
          iso2: 'sm'
        }, {
          name: 'Sao Tome and Principe',
          demonym: 'São Toméan',
          iso2: 'st'
        }, {
          name: 'Saudi Arabia',
          demonym: 'Saudi Arabian',
          iso2: 'sa'
        }, {
          name: 'Senegal',
          demonym: 'Senegalese',
          iso2: 'sn'
        }, {
          name: 'Serbia',
          demonym: 'Serb',
          iso2: 'rs'
        }, {
          name: 'Seychelles',
          demonym: 'Seychellois',
          iso2: 'sc'
        }, {
          name: 'Sierra Leone',
          demonym: 'Sierra Leonean',
          iso2: 'sl'
        }, {
          name: 'Singapore',
          demonym: 'Singaporean',
          iso2: 'sg'
        }, {
          name: 'Slovakia',
          demonym: 'Slovak',
          iso2: 'sk'
        }, {
          name: 'Vietnam',
          demonym: 'Vietnamese',
          iso2: 'vn'
        }, {
          name: 'Slovenia',
          demonym: 'Slovene',
          iso2: 'si'
        }, {
          name: 'Somalia',
          demonym: 'Somali',
          iso2: 'so'
        }, {
          name: 'South Africa',
          demonym: 'South African',
          iso2: 'za'
        }, {
          name: 'Zimbabwe',
          demonym: 'Zimbabwean',
          iso2: 'zw'
        }, {
          name: 'Spain',
          demonym: 'Spanish',
          iso2: 'es'
        }, {
          name: 'South Sudan',
          demonym: 'South Sudanese',
          iso2: 'ss'
        }, {
          name: 'Sudan',
          demonym: 'Sudanese',
          iso2: 'sd'
        }, {
          name: 'Western Sahara',
          demonym: 'Sahrawi',
          iso2: 'eh'
        }, {
          name: 'Suriname',
          demonym: 'Surinamese',
          iso2: 'sr'
        }, {
          name: 'Svalbard and Jan Mayen',
          demonym: 'of Svalbard',
          iso2: 'sj'
        }, {
          name: 'Swaziland',
          demonym: 'Swazi',
          iso2: 'sz'
        }, {
          name: 'Sweden',
          demonym: 'Swedish',
          iso2: 'se'
        }, {
          name: 'Switzerland',
          demonym: 'Swiss',
          iso2: 'ch'
        }, {
          name: 'Syrian Arab Republic',
          demonym: 'Syrian',
          iso2: 'sy'
        }, {
          name: 'Tajikistan',
          demonym: 'Tajik',
          iso2: 'tj'
        }, {
          name: 'Thailand',
          demonym: 'Thai',
          iso2: 'th'
        }, {
          name: 'Togo',
          demonym: 'Togolese',
          iso2: 'tg'
        }, {
          name: 'Tokelau',
          demonym: 'Tokelauan',
          iso2: 'tk'
        }, {
          name: 'Tonga',
          demonym: 'Tongan',
          iso2: 'to'
        }, {
          name: 'Trinidad and Tobago',
          demonym: 'Trinidadian',
          iso2: 'tt'
        }, {
          name: 'United Arab Emirates',
          demonym: 'Emirian',
          iso2: 'ae'
        }, {
          name: 'UAE',
          demonym: 'Emirian',
          iso2: 'ae'
        }, {
          name: 'Abu Dhabi',
          demonym: 'Abu Dhabi',
          iso2: 'ae'
        }, {
          name: 'Tunisia',
          demonym: 'Tunisian',
          iso2: 'tn'
        }, {
          name: 'Turkey',
          demonym: 'Turk',
          iso2: 'tr'
        }, {
          name: 'Turkmenistan',
          demonym: 'Turkmen',
          iso2: 'tm'
        }, {
          name: 'Turks and Caicos Islands',
          demonym: 'Turks and Caicos Islander',
          iso2: 'tc'
        }, {
          name: 'Tuvalu',
          demonym: 'Tuvaluan',
          iso2: 'tv'
        }, {
          name: 'Uganda',
          demonym: 'Ugandan',
          iso2: 'ug'
        }, {
          name: 'Ukraine',
          demonym: 'Ukrainian',
          iso2: 'ua'
        }, {
          name: 'Macedonia',
          demonym: 'Macedonian',
          iso2: 'mk'
        }, {
          name: 'Egypt',
          demonym: 'Egyptian',
          iso2: 'eg'
        }, {
          name: 'United Kingdom',
          demonym: 'British',
          iso2: 'gb'
        }, {
          name: 'Great Britain',
          demonym: 'British',
          iso2: 'gb'
        }, {
          name: 'Britain',
          demonym: 'British',
          iso2: 'gb'
        }, {
          name: 'UK',
          demonym: 'British',
          iso2: 'gb'
        }, {
          name: 'Guernsey',
          demonym: 'of Guernsey',
          iso2: 'gg'
        }, {
          name: 'Jersey',
          demonym: 'of Jersey',
          iso2: 'je'
        }, {
          name: 'Isle of Man',
          demonym: 'Manxman',
          iso2: 'im'
        }, {
          name: 'Tanzania',
          demonym: 'Tanzanian',
          iso2: 'tz'
        }, {
          name: 'United States',
          demonym: 'American',
          iso2: 'us'
        }, {
          name: 'United States of America',
          demonym: 'American',
          iso2: 'us'
        }, {
          name: 'US',
          demonym: 'American',
          iso2: 'us'
        }, {
          name: 'USA',
          demonym: 'American',
          iso2: 'us'
        }, {
          name: 'Virgin Islands',
          demonym: 'Virgin Islander',
          iso2: 'vi'
        }, {
          name: 'Burkina Faso',
          demonym: 'Burkinabe',
          iso2: 'bf'
        }, {
          name: 'Uruguay',
          demonym: 'Uruguayan',
          iso2: 'uy'
        }, {
          name: 'Uzbekistan',
          demonym: 'Uzbek',
          iso2: 'uz'
        }, {
          name: 'Venezuela',
          demonym: 'Venezuelan',
          iso2: 've'
        }, {
          name: 'Wallis and Futuna',
          demonym: 'Wallisian',
          iso2: 'wf'
        }, {
          name: 'Samoa',
          demonym: 'Samoan',
          iso2: 'ws'
        }, {
          name: 'Yemen',
          demonym: 'Yemenite',
          iso2: 'ye'
        }, {
          name: 'Zambia',
          demonym: 'Zambian',
          iso2: 'zm'
        }, {
          name: 'Rhodesia',
          demonym: 'Rhodesian',
          iso2: 'rh'
        }, {
          name: 'European Union',
          demonym: 'European',
          iso2: 'eu'
        }, {
          name: 'Pacific',
          demonym: 'Pacific',
          iso2: 'jp'
        }]);
        return country;
      })
    .then(() => console.log('finished populating countries'))
    .catch(err => console.log('error populating countries', err));
  }
}
