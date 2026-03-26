// src/pertemuan-2/BiodataDiri.jsx (versi sederhana untuk testing)
import './custom.css';

// Child Component 1: Header
function Header({ name, nim }) {
  return (
    <div className="header">
       <img src="img/DSCF3977.JPG" alt="logo" width="400"/>
      <h1>{name}</h1>
      <p>NIM: {nim}</p>
    </div>
  );
}


// Child Component 2: Institution
function Institution() {
  return (
    <div className="institution">
      <h2>Institusi</h2>
      <p>POLITEKNIK CALTEX RIAU</p>
    </div>
  );
}

// Child Component 3: Program Study
function ProgramStudy() {
  return (
    <div className="program">
      <h2>Program Studi</h2>
      <p>Sistem Informasi</p>
    </div>
  );
}

// Child Component 4: Email
function Email() {
  return (
    <div className="email">
      <h2>Email</h2>
      <p>alhafizh24si@mahasiswa.pcr.ac.id</p>
    </div>
  );
}

// Child Component 5: About
function About() {
  return (
    <div className="about">
      <h2>Tentang Pengembang</h2>
      <p>Mahasiswa Sistem Informasi di Politeknik Caltex Riau yang antusias dalam pengembangan web.</p>
    </div>
  );
}

// Child Component 6: Contact
function Contact() {
  return (
    <div className="contact">
      <h2>Kontak</h2>
      <p>📧 alhafizh24si@mahasiswa.pcr.ac.id</p>
      <p>📱 +62 812-3456-7890</p>
    </div>
  );
}

// Main Component
function BiodataDiri() {
  return (
    <div className="container">
      <Header name="Muhammad Anugrah Alhafizh" nim="2457301087" />
      <Institution />
      <ProgramStudy />
      <Email />
      <About />
      <Contact />
    </div>
  );
}

export default BiodataDiri;