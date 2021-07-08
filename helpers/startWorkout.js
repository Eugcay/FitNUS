import firebase from "firebase";

export const finishJio = async (id, workout) => {
    await firebase.firestore().collection('jios').doc(id).update({completed: true})
    const db = firebase.firestore()
    const batch = db.batch()

    const collection = workout?.exercises ? 'history' : 'runs'
    
    jioStatus.people.forEach(user => {
      const docRef = db.collection('users').doc(user.uid).collection(collection).doc()
      batch.set(docRef, workout)
    })
    
    batch.commit()
  }