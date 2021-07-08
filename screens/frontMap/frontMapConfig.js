import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
    map: {
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      top: 25
    },
  });

export const presetLocations = [
    {
      latlng: {
        latitude: 1.3050038005230384,
        longitude: 103.77226573268865,
      },
      title: "UTown Gym",
      open: "Weekdays: 0700hr - 2030hr, Weekends: 0700hr - 2030hr",
      website: "https://uci.nus.edu.sg/suu/facilities/about-suu-sports-facilities/",
      description:
        "Monday to Friday 0700hr to 2200hr. Weekends and Public Holidays 0700hr to 2200hr",
      address: "2 College Ave West, Singapore 138607",
      index: 0,
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FUTownGym.jpg?alt=media&token=76273861-b5a2-4aee-b2d0-47149779878e'
    },
    {
      latlng: {
        latitude: 1.3007140063983416,
        longitude: 103.77576209191275,
      },
      title: "MPSH3 Gym",
      open: "Weekdays: 1100hr - 2000hr, Weekends: CLOSED",
      website: "https://uci.nus.edu.sg/suu/facilities/about-suu-sports-facilities/",
      address: "Sports Drive 1, Singapore 119077",
      description:
        "Monday to Friday 1100hr to 2000hr. Weekends and Public Holidays CLOSED",
      index: 1,
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FSRCGym.jpg?alt=media&token=bd838af4-a961-47bb-aa53-897e98c472dd'
    },
    {
      latlng: {
        latitude: 1.2998962556887896,
        longitude: 103.77541237391264,
      },
      title: "USC Gym",
      open: "Weekdays: 0900hr - 2100hr, Weekends: 0900 - 1900hr",
      website: "https://uci.nus.edu.sg/suu/facilities/about-suu-sports-facilities/university-sports-centre/",
      address: "2 Sports Drive 1, National University of Singapore, Singapore 117561",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 2, //need to change the pics
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FSRCGym.jpg?alt=media&token=bd838af4-a961-47bb-aa53-897e98c472dd'
    },
    {
      latlng: {
        latitude: 1.3188077583479827,
        longitude: 103.8172019198111,
      },
      title: "Bukit Timah Gym",
      open: "Weekdays: 0730hr - 2100hr, Weekends: 0730hr - 1700hr (CLOSED on Sundays)",
      website: "https://nus.edu.sg/osa/student-services/ssc/bukit-timah-campus/facilities-at-btc",
      address: "469 Bukit Timah Rd, Singapore 259756",
      description:
        "Monday to Friday 0730hr to 2100hr. Saturday 0730hr to 1700hr. Sunday and Public Holidays CLOSED (For BTC students and staff only)",
      index: 3,
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FBTCGym.jpg?alt=media&token=c8d1acf4-2ed3-4ebc-bdad-8477ee2540ed'
    },
    {
      latlng: {
        latitude: 1.3051644416156996,
        longitude: 103.7723855448247,
      },
      title: "Stephen Riady Centre Swimming Pool",
      open: "Weekdays: 0700hr - 2100hr, Weekends: 0900hr - 1900hr",
      website: "https://uci.nus.edu.sg/suu/facilities/about-suu-sports-facilities/",
      address: "2 College Ave West, Singapore 138607",
      description:
        "Monday to Friday 0730hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 4,
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FUTownPool.jpg?alt=media&token=78ce36e0-da17-48bb-a4ce-04da15430ed0'
    },
    {
      latlng: {
        latitude: 1.2998052316015167,
        longitude: 103.7755360652127,
      },
      title: "USC Swimming Pool",
      open: "Weekdays: 0730hr - 2100hr, Weekends: 0900hr - 1900hr",
      website: "https://uci.nus.edu.sg/suu/facilities/about-suu-sports-facilities/university-sports-centre/",
      address: "2 Sports Drive 1, National University of Singapore, Singapore 117561",
      description:
        "Monday to Friday 0730hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 5,
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FUSCPool.jpg?alt=media&token=54545a00-8406-4a6e-af7b-5a431bab4d87'
    },
    {
      latlng: {
        latitude: 1.298764029536889,
        longitude: 103.77723916069229,
      },
      title: "USC Tennis Courts",
      open: "Weekdays: 0900hr - 2100hr, Weekends: 0900hr - 1900hr",
      website: "https://reboks.nus.edu.sg/nus_public_web/public/",
      address: "2 Sports Drive 1, National University of Singapore, Singapore 117561",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 6,
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FUSCTennis.jpg?alt=media&token=593ebcec-2a82-4edd-9e03-8c9da8536e84'
    },
    {
      latlng: {
        latitude: 1.2996399288887228,
        longitude: 103.77724379907713,
      },
      title: "USC Handball Courts",
      open: "Weekdays: 0900hr - 2100hr, Weekends: 0900hr - 1900hr",
      website: "https://reboks.nus.edu.sg/nus_public_web/public/",
      address: "2 Sports Drive 1, National University of Singapore, Singapore 117561",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 7,
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FUSCHandBall.jpg?alt=media&token=800412e3-c69c-47ff-98f0-6b3ded4217d4'
    },
    {
      latlng: {
        latitude: 1.3000892337791696,
        longitude: 103.77703316792304,
      },
      title: "USC Basketball Courts",
      open: "Weekdays: 0900hr - 2100hr, Weekends: 0900hr - 1900hr",
      website: "https://reboks.nus.edu.sg/nus_public_web/public/",
      address: "2 Sports Drive 1, National University of Singapore, Singapore 117561",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 8,
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FNUSBasketball.jpg?alt=media&token=7720b049-2f5b-4d91-b2b0-53d2af58403e'
    },
    {
      latlng: {
        latitude: 1.3003979554453948,
        longitude: 103.77699207744575,
      },
      title: "USC Archery/volleyball Courts",
      open: "Weekdays: 0900hr - 2100hr, Weekends: 0900hr - 1900hr",
      address: "2 Sports Drive 1, National University of Singapore, Singapore 117561",
      website: "https://reboks.nus.edu.sg/nus_public_web/public/",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 9,
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FNUSMiscCourts.jpg?alt=media&token=e221d6cb-236b-42c8-93c1-86a898af42fe'
    },
    {
      latlng: {
        latitude: 1.2999029382834928,
        longitude: 103.77525532694317,
      },
      title: "USC Squash Courts",
      open: "Weekdays: 0900hr - 2100hr, Weekends: 0900hr - 1900hr",
      website: "https://reboks.nus.edu.sg/nus_public_web/public/",
      address: "2 Sports Drive 1, National University of Singapore, Singapore 117561",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 11,
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FNUSSquash.jpg?alt=media&token=769d816f-3e64-4398-add7-30f86af89ede'
    },
    {
      latlng: {
        latitude: 1.300432226076777,
        longitude: 103.77610168353331,
      },
      title: "USC Badminton Courts",
      open: "Weekdays: 0900hr - 2100hr, Weekends: 0900hr - 1900hr",
      website: "https://reboks.nus.edu.sg/nus_public_web/public/",
      address: "Sports Drive 1, Singapore 119077",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 12,
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FNUSBadminton.jpg?alt=media&token=1577db91-8e2f-407c-b9e9-f56c3c99a7d7'
    },
    {
      latlng: {
        latitude: 1.3051974804152258,
        longitude: 103.77192223464816,
      },
      title: "UTown MPH",
      open: "Weekdays: 0900hr - 2100hr, Weekends: 0900hr - 1900hr",
      website: "https://reboks.nus.edu.sg/nus_public_web/public/",
      address: "2 College Ave West, Singapore 138607",
      description:
        "Monday to Friday 0900hr to 2100hr. Weekends and Public Holidays 0900hr to 1900hr",
      index: 13,
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FNUSMph.jpg?alt=media&token=d437a487-dd4a-4e1b-ac34-042b7e4b2608'
    },
    {
      latlng: {
        latitude: 1.3049399787896439,
        longitude: 103.77313671368337,
      },
      title: "UTown Green",
      open: "24/7...Its a big grass patch, no ones stoping you but if you're there at 3a.m Ashy will def judge you",
      website: "https://uci.nus.edu.sg/suu/facilities/about-suu-utown-non-residential-facilities/town-green/",
      address: "2 College Ave West, Singapore 138607",
      description: "24/7 ig .-.",
      index: 14,
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FUTownGreen.jpg?alt=media&token=57ef70a0-0351-42c2-9312-c054907374d1'
    },
    {
      latlng: {
        latitude: 1.298684969725457,
        longitude: 103.77834249029279,
      },
      title: "USC Track and Field",
      description: "Requires booking",
      open: "Weekdays: 0900hr - 2100hr, Weekends: 0900hr - 1900hr",
      website: "https://reboks.nus.edu.sg/nus_public_web/public/",
      address: "2 Sports Drive 1, National University of Singapore, Singapore 117561",
      index: 15,
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FNUSTrack.jpg?alt=media&token=728303f6-4a96-4b0c-96d1-2f6205a23fd4'
    },
    {
      latlng: {
        latitude: 1.298684969725457,
        longitude: 103.77834249029279,
      },
      title: "UTown Climbing Wall",
      open: "Weekdays: 0900hr - 2100hr, Weekends: 0900hr - 1900hr",
      website: "https://uci.nus.edu.sg/suu/facilities/about-suu-sports-facilities/",
      address: "2 College Ave West, Singapore 138607",
      description: "Requires booking",
      index: 16,
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FUTownClimbingWall.jpg?alt=media&token=e90484ba-822f-447f-b7e1-b3ba09ed9b44'
    },
    {
      latlng: {
        latitude: 1.298684969725457,
        longitude: 103.77834249029279,
      },
      title: "USC Bouldering Wall",
      description: "Requires booking",
      open: "Weekdays: 0900hr - 2100hr, Weekends: 0900hr - 1900hr",
      address: "2 Sports Drive 1, National University of Singapore, Singapore 117561",
      website: "https://uci.nus.edu.sg/suu/facilities/about-suu-sports-facilities/university-sports-centre/",
      index: 17,
      imageURL: 'https://firebasestorage.googleapis.com/v0/b/fitnus-b7f2b.appspot.com/o/locations%2FUSCBoulderingWall.jpg?alt=media&token=f2fc4330-9811-4e8f-af70-264db85bc621'
    },
  ]; 