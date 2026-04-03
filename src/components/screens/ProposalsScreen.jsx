import React from 'react';

/**
 * ProposalsScreen - Compromiso Nacional Detallado
 * Basado íntegramente en el PDF de Estrategias Fajardo 2026.
 * SOLID - SRP: Pantalla dedicada al Storytelling programático.
 */
export default function ProposalsScreen() {
    return (
        <div className="screen active" id="screen-proposals" style={{ paddingBottom: '100px' }}>

            {/* HERO ICONOGRÁFICO */}
            <div className="card hero-card" style={{ padding: 0, overflow: 'hidden', borderRadius: '20px', border: '3px solid var(--text-primary)', marginBottom: '32px', boxShadow: '0 12px 30px rgba(0,0,0,0.15)' }}>
                <img src="/fajardo_sombrero.webp" alt="Sergio Fajardo" className="proposals-hero-img" />
                <div style={{ padding: '20px', background: 'white', borderTop: '3px solid var(--text-primary)', textAlign: 'center' }}>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-primary)' }}>Nuestro Compromiso con Colombia</h2>
                    <p style={{ margin: '8px 0 0', fontWeight: 700, color: 'var(--text-accent)' }}>Cambio Serio y Seguro</p>
                </div>
            </div>

            {/* PESTAÑA 1: SEGURIDAD */}
            <section style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--text-primary)', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 900 }}>1</div>
                    <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Seguridad: Plan Guardián</h3>
                </div>
                <div className="question-list">
                    <div className="card" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)', padding: '16px', borderRadius: '12px', marginBottom: '10px' }}>
                        <strong>Comandancia Directa:</strong> Compromiso de asumir el rol de Comandante Supremo desde el primer día para recuperar el orden.
                    </div>
                    <div className="card" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)', padding: '16px', borderRadius: '12px', marginBottom: '10px' }}>
                        <strong>Fortalecimiento Tecnológico:</strong> Uso de inteligencia artificial y drones para superar la ventaja táctica de las bandas.
                    </div>
                    <div className="card" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)', padding: '16px', borderRadius: '12px', marginBottom: '10px' }}>
                        <strong>Lucha contra la Extorsión:</strong> Refuerzo de los grupos GAULA y control efectivo de las cárceles para desarticular el cobro de "vacunas".
                    </div>
                    <div className="card" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)', padding: '16px', borderRadius: '12px', marginBottom: '10px' }}>
                        <strong>Justicia y Desarrollo:</strong> Programas sociales masivos en zonas críticas para evitar el reclutamiento de nuestros jóvenes.
                    </div>
                </div>
            </section>

            {/* PESTAÑA 2: EDUCACIÓN */}
            <section style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--text-accent)', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 900 }}>2</div>
                    <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Revolución del Conocimiento</h3>
                </div>
                <div className="question-list">
                    <div className="card" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)', padding: '16px', borderRadius: '12px', marginBottom: '10px' }}>
                        <strong>Conexión Productiva:</strong> Alinear la formación técnica y universitaria con las necesidades de desarrollo de cada territorio.
                    </div>
                    <div className="card" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)', padding: '16px', borderRadius: '12px', marginBottom: '10px' }}>
                        <strong>Salud Mental:</strong> Estrategia de resiliencia juvenil para la competitividad y la paz territorial.
                    </div>
                    <div className="card" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)', padding: '16px', borderRadius: '12px', marginBottom: '10px' }}>
                        <strong>Educación Pública de Calidad:</strong> Fortalecimiento con estándares de excelencia, gratuita y con infraestructura digna.
                    </div>
                </div>
            </section>

            {/* PESTAÑA 3: ECONOMÍA */}
            <section>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '40px', height: '40px', background: '#22C55E', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', fontWeight: 900 }}>3</div>
                    <h3 style={{ fontSize: '1.4rem', margin: 0 }}>Economía con Transparencia</h3>
                </div>
                <div className="question-list">
                    <div className="card" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)', padding: '16px', borderRadius: '12px', marginBottom: '10px' }}>
                        <strong>Gasto Responsable:</strong> Mantener el gasto real sin incrementos desmesurados para estabilizar las finanzas del país.
                    </div>
                    <div className="card" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)', padding: '16px', borderRadius: '12px', marginBottom: '10px' }}>
                        <strong>Reforma Tributaria Ética:</strong> Eliminar beneficios para los sectores más ricos y combatir la evasión de frente.
                    </div>
                    <div className="card" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.1)', padding: '16px', borderRadius: '12px', marginBottom: '10px' }}>
                        <strong>Apoyo a la Agroindustria:</strong> Incentivos para empresas que se asocien con pequeños productores nacionales.
                    </div>
                </div>
            </section>

            <div style={{ textAlign: 'center', marginTop: '48px', padding: '24px', background: 'var(--text-primary)', borderRadius: '16px', color: 'white' }}>
                <p style={{ margin: 0, fontWeight: 800 }}>"El enemigo de los colombianos no son los colombianos, sino la corrupción y la violencia."</p>
            </div>
        </div>
    );
}
