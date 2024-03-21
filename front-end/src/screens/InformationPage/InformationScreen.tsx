import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ScBaseContainer } from "../../components/BaseContainer/BaseContainer.styled";
import { Exercises, ExerciseList } from "../../types/API";
import { fetchAllExercises } from "../../services/API";

interface InformationScreenProps {
    navigation: any;
  }
  
  interface BodyPartSections {
    [key: string]: Exercises[];
  }
  
  const InformationScreen = ({ navigation }: InformationScreenProps) => {
    const [exercises, setExercises] = useState<ExerciseList | null>(null);
    const [error, setError] = useState(false);
    const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
    const [expandedExercises, setExpandedExercises] = useState<{ [key: string]: boolean }>({});
  
    async function getExercises() {
      const fetchedExercises: ExerciseList | null = await fetchAllExercises();
      if (fetchedExercises) {
        setExercises(fetchedExercises);
      } else {
        setError(true);
      }
    }
  
    useEffect(() => {
      getExercises();
    }, []);
  
    const groupByBodyPart = (exercisesList: ExerciseList): BodyPartSections => {
      return exercisesList.reduce((acc: BodyPartSections, exercise) => {
        exercise.body_parts.forEach(bodyPart => {
          if (!acc[bodyPart.name]) {
            acc[bodyPart.name] = [];
          }
          acc[bodyPart.name].push(exercise);
        });
        return acc;
      }, {});
    };
  
    const toggleSection = (bodyPartName: string) => {
      setExpandedSections(prevState => ({
        ...prevState,
        [bodyPartName]: !prevState[bodyPartName],
      }));
    };
  
    const toggleExercise = (exerciseId: string) => {
      setExpandedExercises(prevState => ({
        ...prevState,
        [exerciseId]: !prevState[exerciseId],
      }));
    };
  
    const exercisesByBodyPart = exercises ? groupByBodyPart(exercises) : {};
  
    return (
      <ScBaseContainer>
        <Text style={styles.headerTitle}>Exercise Information</Text>
        <ScrollView style={styles.scrollView}>
          {Object.keys(exercisesByBodyPart).map((bodyPart, index) => (
            <View key={index} style={styles.bodyPartSection}>
              <TouchableOpacity style={styles.headerSection} onPress={() => toggleSection(bodyPart)}>
                <Text style={styles.headerText}>{bodyPart} Exercises</Text>
                <Text style={styles.arrow}>{expandedSections[bodyPart] ? '↑' : '↓'}</Text>
              </TouchableOpacity>
              {expandedSections[bodyPart] && exercisesByBodyPart[bodyPart].map((exercise, exerciseIndex) => (
                <View key={exerciseIndex} style={styles.exerciseSection}>
                  <TouchableOpacity style={styles.exerciseHeader} onPress={() => toggleExercise(exercise.id.toString())}>
                    <Text style={styles.exerciseText}>{exercise.name}</Text>
                    <Text style={styles.arrow2}>{expandedExercises[exercise.id.toString()] ? '↑' : '↓'}</Text>
                  </TouchableOpacity>
                  {expandedExercises[exercise.id.toString()] && (
                    <View style={styles.descriptionSection}>
                      <Text style={styles.descriptionText}>{exercise.description}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))}
          {error && <Text style={styles.errorText}>Failed to fetch exercises</Text>}
        </ScrollView>
      </ScBaseContainer>
    );
  };
  
  const styles = StyleSheet.create({
    headerTitle: {
        color: '#ff6c01', 
        fontSize: 24,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center', 
        marginTop: -20,
        marginBottom: 20,
      },
    scrollView: {
      width: '100%',
    },
    bodyPartSection: {
      marginBottom: 10,
      backgroundColor: '#141115', 
    },
    headerSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: '#ff6c01',
      padding: 10,
      borderRadius: 5,
    },
    headerText: {
      color: '#000000',
      fontSize: 18,
      fontWeight: 'bold',
    },
    arrow: {
      fontWeight: 'bold',
    },
    arrow2: {
        fontWeight: 'bold',
        color: '#ff8610',
    },
    exerciseSection: {
      backgroundColor: '#000000', 
      marginRight: 30,
      marginLeft: 30,
      marginTop: 10,
      padding: 5,
      borderRadius: 5,
    },
    exerciseHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
        // justifyContent: 'center', 
        alignItems: 'center',
      padding: 10,
      marginTop: 5,
    },
    exerciseText: {
        color: '#ff8610',
        fontSize: 16,
        // textAlign: 'center', 
      },
      descriptionSection: {
        backgroundColor: '#141115', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: 10,
        marginLeft: 20, 
        marginRight: 20,
        marginBottom: 10, 
        borderRadius: 5,
      },
      descriptionText: {
        color: '#FFFFFF', 
        fontSize: 14,
      },
      errorText: {
        color: 'red',
        marginTop: 20,
        textAlign: 'center', 
      },
    });

export default InformationScreen;