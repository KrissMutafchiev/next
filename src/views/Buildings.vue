<template>
  <v-container >
        <v-row class="text-center">
       <v-col class=" lighten-2 py-7 "  offset-md="3" cols="6">
        <v-data-table
    :headers="headers"
    :items="buildings"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Building List</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              New Item
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedBuilding.name"
                      label="name"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedBuilding.area"
                      label="area"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedBuilding.location"
                      label="location"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedBuilding.image"
                      label="image"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteBuildingConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editBuilding(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteBuilding(item)"
      >
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template>
    <template v-slot:item.image="{ item}">
        <v-img v-bind:src="item.image" style="width: 70px; height:50px">
        </v-img>
    </template>

  </v-data-table>
      
      </v-col> 
        
        </v-row>

  </v-container>

</template>

<script>
import { collection ,addDoc , onSnapshot , deleteDoc ,doc , updateDoc} from "firebase/firestore"; 

  import {db} from '../firebase/db'
  export default {

    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Id',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: 'Name', value: 'name' },
        { text: 'Area', value: 'area' },
        { text: 'Location', value: 'location' },
        { text: 'image', value: 'image' },
        { text: 'Actions', value: 'actions' },

      ],
      buildings: [],
      editedIndex: -1,
      editedBuilding: {
        id:'',
        name: '',
        area: '',
        location: '',
        image: '',
      },
      defaultBuilding: {
        id:'',
        name: '',
        area: '',
        location: '',
        image: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Building' : 'Edit Building'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
     async initialize () {

        onSnapshot(collection(db, "buildings"), (querySnapshot) => {
          const changes = querySnapshot.docChanges();

          changes.forEach(change=>{
            if(change.type === 'added'){
              this.buildings.push({
                ...change.doc.data(),
                id:change.doc.id
              })
            }
            if(change.type === 'removed'){
              this.buildings.splice(this.editedIndex, 1)
            }

            if(change.type === 'modified'){
              this.buildings.splice(this.editedIndex, 1, {...change.doc.data()})
            }
          })
        });
      },

      editBuilding (item) {
        this.editedIndex = this.buildings.indexOf(item);
        this.editedBuilding = Object.assign({}, item);
        this.dialog = true;
      },

      deleteBuilding (item) {
        this.editedIndex = this.buildings.indexOf(item);
        this.editedBuilding = Object.assign({}, item);
        this.dialogDelete = true;
      },

     async deleteBuildingConfirm () {
        await deleteDoc(doc(db, "buildings", this.buildings[this.editedIndex].id));
        this.closeDelete();
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedBuilding = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedBuilding = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        })
      },

     async save () {
        if (this.editedIndex > -1) {
          const buildingsRef = doc(db, 'buildings', this.buildings[this.editedIndex].id);
          await updateDoc(buildingsRef, this.editedBuilding);
        } else {
          try {
            await addDoc(collection(db, "buildings"), this.editedBuilding);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
        }
        this.close()
      },
    },


  }
</script>
