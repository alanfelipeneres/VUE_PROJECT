<template>
  <div>
    <!-- <h1>{{titulo}}</h1> -->
    <titulo
      :texto="professor.id != undefined ? 'Professor: ' + professor.nome : 'Todos os alunos'"
    />
    <div v-if="professor.id != undefined">
      <input type="text" placeholder="Nome do Aluno" v-model="nome" v-on:keyup.enter="addAluno()" />
      <button class="btn btninput" type="button" @click="addAluno">Adicionar</button>
    </div>

    <table>
      <thead>
        <th>Mat.</th>
        <th>Nome</th>
        <th>Opções</th>
      </thead>
      <tbody v-if="alunos.length">
        <tr v-for="(aluno, index) in alunos" :key="index">
          <td class="colPequeno">{{aluno.id}}</td>
          <!-- <td>{{aluno.id}}</td> -->

          <router-link :to="`/alunoDetalhe/${aluno.id}`" tag="td" style="cursor:pointer">{{aluno.nome}} {{aluno.sobrenome}}</router-link>
          <td class="colPequeno">
            <button class="btn btn_danger" @click="remover(aluno)">Remover</button>
          </td>
        </tr>
      </tbody>
      <tfoot v-else>Nenhum aluno encontrado</tfoot>
    </table>
  </div>
</template>

<script>
import Titulo from "../_shared/Titulo";

export default {
  components: {
    Titulo,
  },
  data() {
    return {
      titulo: "Aluno",
      //Obtendo o parâmetro que vem na url
      professorid: this.$route.params.prof_id,
      nome: "",
      alunos: [],
      professor: {},
    };
  },

  created() {
    if (this.professorid) {
      this.carregarProfessor();
      this.$http
        .get("http://localhost:3000/alunos?professor.id=" + this.professorid)
        .then((res) => res.json())
        .then((alunos) => (this.alunos = alunos));
    } else {
      this.$http
        .get("http://localhost:3000/alunos")
        .then((res) => res.json())
        .then((alunos) => (this.alunos = alunos));
    }
  },

  props: {},
  methods: {
    addAluno() {
      if (this.nome) {
        let _aluno = {
          nome: this.nome,
          sobrenome: "",
          professor: {
            id: this.professor.id,
            nome: this.professor.nome,
          },
        };

        this.$http
          .post("http://localhost:3000/alunos", _aluno)
          .then((res) => res.json())
          .then((alunoRetornado) => {
            this.alunos.push(alunoRetornado);
            this.nome = "";
          });
      }
    },
    carregarProfessor() {
      this.$http
        .get("http://localhost:3000/professores/" + this.professorid)
        .then((res) => res.json())
        .then((professor) => {
          this.professor = professor;
        });
    },
    remover(aluno) {
      this.$http.delete(`http://localhost:3000/alunos/${aluno.id}`).then(() => {
        let indice = this.alunos.indexOf(aluno);
        this.alunos.splice(indice, 1);
      });

      //alert('Removendo o id: ' + aluno.id);
    },
  },
};
</script>

<style scoped>
input {
  width: calc(100% - 195px);
  border: 0;
  padding: 20px;
  font-size: 1.3em;
  color: #687f7f;
  display: inline;
}

.btninput {
  width: 150px;
  border: 0px;
  padding: 16px;
  font-size: 1.3em;
  display: inline;
  background-color: rgb(116, 116, 115);
}

.btninput:hover {
  padding: 16px;
  margin: 0px;
  border: 0px;
}
</style>
