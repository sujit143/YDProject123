// export let resourceConferenceData: Object[] = [
//   {
//       Id: 1,
//       Subject: 'Burning Man',
//       StartTime: new Date(2018, 5, 1, 15, 0),
//       EndTime: new Date(2018, 5, 1, 17, 0),
//       Location: '54 DEAN',
//       Providers: 'Dr Coba Miguel',
//       status: 'Approved',
//       ConferenceId: [1, 2, 3]
//   }, {
//       Id: 2,
//       Subject: 'Data-Driven Economy',
//       StartTime: new Date(2018, 5, 2, 12, 0),
//       EndTime: new Date(2018, 5, 2, 14, 0),
//       Location: '100A Liv, Brooklyn',
//       Providers: 'Dr Cabatu Orsuville',
//       status: 'pending',
//       ConferenceId: [1, 2]
//   }, {
//       Id: 3,
//       Subject: 'Techweek',
//       StartTime: new Date(2018, 5, 2, 15, 0),
//       EndTime: new Date(2018, 5, 2, 17, 0),
//       Location: '54 DEAN',
//       Providers: 'Dr Coba Miguel',
//       status: 'checked-In',
//       ConferenceId: [2, 3]
//   }, {
//       Id: 4,
//       Subject: 'Content Marketing World',
//       StartTime: new Date(2018, 5, 2, 18, 0),
//       EndTime: new Date(2018, 5, 2, 20, 0),
//       Location: 'New Brunswick',
//       Providers: 'Dr Cabatu Orsuville',
//       status: 'Approved',
//       ConferenceId: [1, 3]
//   }, {
//       Id: 5,
//       Subject: 'B2B Marketing Forum',
//       StartTime: new Date(2018, 5, 3, 10, 0),
//       EndTime: new Date(2018, 5, 3, 12, 0),
//       Location: '100A Liv, Brooklyn',
//       Providers: 'Dr Kaplan Charles',
//       status: 'pending',
//       ConferenceId: [1, 2, 3]
//   }, {
//       Id: 6,
//       Subject: 'Business Innovation Factory',
//       StartTime: new Date(2018, 5, 3, 13, 0),
//       EndTime: new Date(2018, 5, 3, 15, 0),
//       Location: 'New Brunswick',
//       Providers: 'Dr Kaplan Charles',
//       status: 'checked-In',
//       ConferenceId: [1, 2]
//   }, {
//       Id: 7,
//       Subject: 'Grow Conference',
//       StartTime: new Date(2018, 5, 3, 16, 0),
//       EndTime: new Date(2018, 5, 3, 18, 0),
//       Location: '54 DEAN',
//       Providers: 'Dabin',
//       status: 'Approved',
//       ConferenceId: [2, 3]
//   }, {
//       Id: 8,
//       Subject: 'Journalism Interactive',
//       StartTime: new Date(2018, 5, 3, 19, 0),
//       EndTime: new Date(2018, 5, 3, 21, 0),
//       Location: '100A Liv, Brooklyn',
//       Providers: 'Dr Kaplan Charles',
//       status: 'pending',
//       ConferenceId: [1, 3]
//   }, {
//       Id: 9,
//       Subject: 'Blogcademy',
//       StartTime: new Date(2018, 5, 4, 10, 0),
//       EndTime: new Date(2018, 5, 4, 11, 30),
//       Location: '54 DEAN',
//       Providers: 'Dabin',
//       status: 'checked-In',
//       ConferenceId: [1, 2, 3]
//   }, {
//       Id: 10,
//       Subject: 'Sustainable Brands',
//       StartTime: new Date(2018, 5, 4, 13, 0),
//       EndTime: new Date(2018, 5, 4, 15, 30),
//       Location: '54 DEAN',
//       Providers: 'Dr Capiola David',
//       status: 'Approved',
//       ConferenceId: [1, 2]
//   }, {
//       Id: 11,
//       Subject: 'Fashion Confidential',
//       StartTime: new Date(2018, 5, 4, 9, 0),
//       EndTime: new Date(2018, 5, 4, 9, 45),
//       Location: 'New Brunswick',
//       Providers: 'Dabin',
//       status: 'pending',
//       ConferenceId: [2, 3]
//   }, {
//       Id: 111,
//       Subject: 'Fashion1 Confidential',
//       StartTime: new Date(2018, 5, 5, 9, 0),
//       EndTime: new Date(2018, 5, 5, 9, 45),
//       Location: 'New Brunswick',
//       Providers: 'Dabin',
//       status: 'checked-In',
//       ConferenceId: [2, 3]
//   }, {
//       Id: 112,
//       Subject: 'Fashion2 Confidential',
//       StartTime: new Date(2018, 5, 4, 9, 0),
//       EndTime: new Date(2018, 5, 4, 9, 45),
//       Location: 'New Brunswick',
//       Providers: 'Dabin',
//       status: 'checked-In',
//       ConferenceId: [2, 3]
//   }, {
//       Id: 12,
//       Subject: 'Mobile World Conference',
//       StartTime: new Date(2018, 5, 5, 12, 0),
//       EndTime: new Date(2018, 5, 5, 14, 0),
//       Location: '54 DEAN',
//       Providers: 'Dr Capiola David',
//       status: 'Approved',
//       ConferenceId: [1, 3]
//   }, {
//       Id: 13,
//       Subject: 'The Human Gathering',
//       StartTime: new Date(2018, 5, 5, 15, 0),
//       EndTime: new Date(2018, 5, 5, 17, 0),
//       Location: 'Flemington Neuro',
//       Providers: 'Aron',
//       status: 'pending',
//       ConferenceId: [1, 2, 3]
//   }, {
//       Id: 14,
//       Subject: 'Web Summit',
//       StartTime: new Date(2018, 5, 5, 18, 0),
//       EndTime: new Date(2018, 5, 5, 20, 0),
//       Location: '54 DEAN',
//       Providers: 'Dr Adin David',
//       status: 'checked-In',
//       ConferenceId: [1, 2]
//   }, {
//       Id: 15,
//       Subject: 'Funnel Hacking Live',
//       StartTime: new Date(2018, 5, 6, 12, 0),
//       EndTime: new Date(2018, 5, 6, 14, 0),
//       Location: 'Flemington Neuro',
//       Providers: 'Dr Capiola David',
//       status: 'pending',
//       ConferenceId: [1, 3]
//   }, {
//       Id: 16,
//       Subject: 'Data Science Conference',
//       StartTime: new Date(2018, 5, 6, 15, 0),
//       EndTime: new Date(2018, 5, 6, 17, 0),
//       Location: '54 DEAN',
//       Providers: 'Aron',
//       status: 'checked-In',
//       ConferenceId: [2, 3]
//   }, {
//       Id: 17,
//       Subject: 'Powerful Living Experience',
//       StartTime: new Date(2018, 5, 6, 21, 0),
//       EndTime: new Date(2018, 5, 6, 23, 30),
//       Location: 'Flemington Neuro',
//       Providers: 'Aron',
//       status: 'Approved',
//       ConferenceId: [1, 2, 3]
//   }, {
//       Id: 18,
//       Subject: 'World Domination Summit',
//       StartTime: new Date(2018, 5, 7, 12, 0),
//       EndTime: new Date(2018, 5, 7, 14, 0),
//       Location: 'Baarn Rehab & Pain Clinic, Flushing, NY',
//       Providers: 'Dr Adin David',
//       status: 'pending',
//       ConferenceId: [2, 3]
//   }, {
//       Id: 19,
//       Subject: 'Burning Man',
//       StartTime: new Date(2018, 5, 7, 15, 0),
//       EndTime: new Date(2018, 5, 7, 17, 0),
//       Location: 'Baarn Rehab & Pain Clinic, Flushing, NY',
//       Providers: 'Dr Coba Miguel',
//       status: 'Approved',
//       ConferenceId: [1, 3]
//   }, {
//       Id: 20,
//       Subject: 'Data-Driven Economy',
//       StartTime: new Date(2018, 5, 7, 18, 0),
//       EndTime: new Date(2018, 5, 7, 20, 0),
//       Location: '38 Astoria',
//       Providers: 'Dr Adin David',
//       status: 'pending',
//       ConferenceId: [1, 2]
//   }
// ];
