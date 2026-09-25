# /// script
# dependencies = [
#   "pymol-open-source-whl",
#   "requests",
# ]
# ///

import os
import sys
import argparse
import pymol
from pymol import cmd

def setup_plddt_colors():
    """Defines AlphaFold pLDDT color ramp in PyMOL:
    - >90: Very high confidence (Dark Blue #0053D6)
    - 70-90: Confident (Light Cyan #65CBF3)
    - 50-70: Low confidence (Yellow #FFDB13)
    - <50: Very low / Disordered (Orange #FF7D45)
    """
    cmd.set_color('af_very_high', [0.0, 0.325, 0.839])
    cmd.set_color('af_confident', [0.396, 0.796, 0.953])
    cmd.set_color('af_low', [1.0, 0.859, 0.075])
    cmd.set_color('af_very_low', [1.0, 0.490, 0.271])

def color_by_plddt(obj_name="structure"):
    """Colors atoms by b-factor assuming b-factor contains AlphaFold pLDDT."""
    setup_plddt_colors()
    cmd.color('af_very_high', f"{obj_name} and b > 90")
    cmd.color('af_confident', f"{obj_name} and b > 70 and b <= 90")
    cmd.color('af_low', f"{obj_name} and b > 50 and b <= 70")
    cmd.color('af_very_low', f"{obj_name} and b <= 50")

def render_structure(
    input_source: str,
    output_path: str,
    style: str = "cartoon",
    color_scheme: str = "plddt",
    width: int = 1920,
    height: int = 1080,
    bg_transparent: bool = True,
    zoom_pocket: bool = False
):
    os.environ['PYOPENGL_PLATFORM'] = 'osmesa'
    pymol.finish_launching(['pymol', '-qc'])

    obj_name = "target_structure"
    
    # Check if local file or PDB ID
    if os.path.exists(input_source):
        cmd.load(input_source, obj_name)
    else:
        print(f"Fetching PDB ID: {input_source} from RCSB...")
        cmd.fetch(input_source, obj_name)

    # Background configuration
    if bg_transparent:
        cmd.set("ray_opaque_background", 0)
        cmd.bg_color("black")
    else:
        cmd.bg_color("black")

    # Render settings
    cmd.set("antialias", 2)
    cmd.set("cartoon_fancy_helices", 1)
    cmd.set("cartoon_flat_sheets", 1)
    cmd.set("cartoon_smooth_loops", 1)
    cmd.set("depth_cue", 1)
    cmd.set("spec_power", 300)
    cmd.set("spec_reflect", 0.5)

    # Styles
    cmd.hide("everything", obj_name)
    if style == "cartoon":
        cmd.show("cartoon", obj_name)
    elif style == "surface":
        cmd.show("surface", obj_name)
        cmd.set("transparency", 0.15, obj_name)
    elif style == "sticks":
        cmd.show("sticks", obj_name)
    else:
        cmd.show("cartoon", obj_name)

    # Ligands / organic molecules if present
    cmd.select("ligands", f"{obj_name} and organic")
    if cmd.count_atoms("ligands") > 0:
        cmd.show("sticks", "ligands")
        cmd.set("stick_radius", 0.35, "ligands")
        cmd.color("atomic", "ligands")
        print("Detected organic ligand! Rendered in stick mode with element colors.")

    # Define custom modern documentary colors
    cmd.set_color("bio_emerald", [0.063, 0.725, 0.506])
    cmd.set_color("bio_cyan", [0.024, 0.714, 0.831])
    cmd.set_color("bio_violet", [0.545, 0.361, 0.965])
    cmd.set_color("bio_slate", [0.392, 0.455, 0.545])

    # Color scheme
    if color_scheme == "plddt":
        color_by_plddt(obj_name)
    elif color_scheme == "secondary":
        cmd.color("bio_cyan", f"{obj_name} and ss h") # helices
        cmd.color("bio_emerald", f"{obj_name} and ss s") # sheets
        cmd.color("bio_slate", f"{obj_name} and ss l+") # loops
    elif color_scheme == "emerald":
        cmd.color("bio_emerald", obj_name)
    elif color_scheme == "cyan":
        cmd.color("bio_cyan", obj_name)
    else:
        cmd.color("bio_cyan", obj_name)

    # Center and Zoom
    if zoom_pocket and cmd.count_atoms("ligands") > 0:
        cmd.zoom("ligands", buffer=5.0)
    else:
        cmd.zoom(obj_name, buffer=2.0)

    # Save PNG
    os.makedirs(os.path.dirname(os.path.abspath(output_path)), exist_ok=True)
    cmd.png(output_path, width=width, height=height, dpi=300, ray=0)
    print(f"Successfully rendered molecular view to: {output_path}")

    # Save PyMOL session file alongside
    session_file = os.path.splitext(output_path)[0] + ".pse"
    cmd.save(session_file)
    print(f"Saved PyMOL session to: {session_file}")

    cmd.quit()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Render 3D molecular structures headlessly using PyMOL.")
    parser.add_argument("--pdb", type=str, required=True, help="PDB ID or path to .pdb/.cif file")
    parser.add_argument("--output", type=str, required=True, help="Path for generated PNG")
    parser.add_argument("--style", type=str, default="cartoon", choices=["cartoon", "surface", "sticks"])
    parser.add_argument("--color", type=str, default="plddt", choices=["plddt", "secondary", "cyan", "emerald"])
    parser.add_argument("--width", type=int, default=1920)
    parser.add_argument("--height", type=int, default=1080)
    parser.add_argument("--pocket", action="store_true", help="Zoom directly into ligand binding pocket")

    args = parser.parse_args()
    render_structure(
        input_source=args.pdb,
        output_path=args.output,
        style=args.style,
        color_scheme=args.color,
        width=args.width,
        height=args.height,
        zoom_pocket=args.pocket
    )
