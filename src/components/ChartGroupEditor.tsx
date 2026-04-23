import Highcharts from 'highcharts';
import { HighchartsReact } from 'highcharts-react-official';
import type { Group, CssValues } from '../types';
import { useTheme } from '../context/ThemeContext';
import { PaletteSelect } from './inputs/PaletteSelect';

// Deterministic pseudo-random values keyed by name
function seedValues(name: string, count: number): number[] {
  let s = name.split('').reduce((a, c) => a + c.charCodeAt(0), 17);
  return Array.from({ length: count }, () => {
    s = ((s * 1664525) + 1013904223) >>> 0;
    return (s % 65) + 30;
  });
}

function resolve(color: string, pv: CssValues): string {
  if (!color) return '#cbd5e1';
  if (color.startsWith('var(--')) return pv[color.slice(4, -1)] ?? '#cbd5e1';
  return color;
}

function buildOptions(
  chartType: Group['chartType'],
  metrics: Array<{ name: string; color: string }>,
  pv: CssValues,
): Highcharts.Options {
  const colors = metrics.map(m => resolve(m.color, pv));
  const base: Highcharts.Options = {
    title: { text: undefined },
    credits: { enabled: false },
    chart: { height: 260, backgroundColor: 'transparent', style: { fontFamily: 'inherit' } },
    legend: { itemStyle: { fontWeight: '400', fontSize: '11px' } },
  };

  if (chartType === 'pie') return { ...base, chart: { ...base.chart, type: 'pie' },
    series: [{ type: 'pie', data: metrics.map((m, i) => ({ name: m.name, y: seedValues(m.name, 1)[0], color: colors[i] })) }] };

  if (chartType === 'line') return { ...base, chart: { ...base.chart, type: 'line' },
    xAxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul'] },
    yAxis: { title: { text: undefined } },
    series: metrics.map((m, i) => ({ type: 'line' as const, name: m.name, data: seedValues(m.name, 7), color: colors[i] })) };

  return { ...base, chart: { ...base.chart, type: 'column' },
    xAxis: { categories: ['Q1','Q2','Q3','Q4'] },
    yAxis: { title: { text: undefined } },
    series: metrics.map((m, i) => ({ type: 'column' as const, name: m.name, data: seedValues(m.name, 4), color: colors[i] })) };
}

export function ChartGroupEditor({ group }: { group: Group }) {
  const { listValues, paletteVars, handleListChange } = useTheme();
  const raw = listValues[group.id] ?? group.defaultItems ?? [];
  const metrics = raw.map(item => ({ name: String(item.name ?? ''), color: String(item.color ?? '') }));

  const updateColor = (idx: number, color: string) =>
    handleListChange(group.id, raw.map((item, i) => i === idx ? { ...item, color } : item));

  const options = buildOptions(group.chartType, metrics, paletteVars);

  return (
    <div className="group chart-group">
      <div className="group-header">
        <h3 className="group-title">{group.label}</h3>
        {group.description && <p className="group-desc">{group.description}</p>}
      </div>
      <div className="chart-group-body">
        <div className="chart-metrics">
          {metrics.map((m, idx) => (
            <div key={idx} className="chart-metric-row">
              <span className="chart-metric-dot" style={{ background: resolve(m.color, paletteVars) }} />
              <span className="chart-metric-name">{m.name}</span>
              <div className="chart-metric-color">
                <PaletteSelect value={m.color} onChange={c => updateColor(idx, c)} />
              </div>
            </div>
          ))}
        </div>
        <div className="chart-preview">
          <HighchartsReact highcharts={Highcharts} options={options} immutable={false} />
        </div>
      </div>
    </div>
  );
}
